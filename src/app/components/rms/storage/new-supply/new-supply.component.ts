import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SupplyApiService} from '../../../../api/supply-api.service';
import {SupplierApiService} from '../../../../api/supplier-api.service';
import {Supplier} from '../../../../model/supplier';
import {Supply} from '../../../../model/supply';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Pack} from '../../../../model/pack';
import {PackApiService} from '../../../../api/pack-api.service';
import {Item} from '../../../../model/item';

export interface ItemSupplyCreateRequest {
  itemId: string | null;
  packId: string | null;
  quantity: number;
  pricePerUnit: number;
}

@Component({
  selector: 'app-new-supply',
  templateUrl: './new-supply.component.html'
})
export class NewSupplyComponent implements OnInit {

  private supply: Supply | undefined;
  suppliers: Supplier[] = [];
  packs: Pack[] = [];
  suppliedItems: Item[] = [];


  mode: 'new' | 'edit' = 'new';

  date = new FormControl(null, Validators.required);
  supplier = new FormControl(null, Validators.required);
  comment = new FormControl('');
  itemSupplies: ItemSupplyCreateRequest[] = [];

  constructor(private api: SupplyApiService,
              private supplierApi: SupplierApiService,
              private supplyApi: SupplyApiService,
              private packApi: PackApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getSupply(id).then(obs => obs.subscribe(supply => {
          this.supply = supply;
          this.mode = 'edit';
          this.date.setValue(supply.suppliedAt);
          this.supplier.setValue(supply.supplierId);
          this.comment.setValue(supply.comment);
          this.itemSupplies = supply.itemSupplies.map(item => ({
            itemId: item.itemId,
            packId: item.packId,
            quantity: item.quantity,
            pricePerUnit: item.pricePerUnit
          }));
        }));
      }
    });
    this.supplierApi.getSuppliers().then(obs => obs.subscribe(suppliers => this.suppliers = suppliers));
    this.packApi.getPacks().then(obs => obs.subscribe(packs => this.packs = packs));
    this.supplyApi.getSuppliedItems().then(obs => obs.subscribe(suppliedItems => this.suppliedItems = suppliedItems));
  }

  get saveDisabled(): boolean {
    return !this.date.valid || !this.supplier.valid;
  }

  onAddItemSupplyClick(): void {
    this.itemSupplies.push({
      itemId: null,
      packId: null,
      quantity: 0,
      pricePerUnit: 0
    });
  }

  onDeleteItemSupplyClick(itemSupply: ItemSupplyCreateRequest): void {
    this.itemSupplies = this.itemSupplies.filter(i => i !== itemSupply);
  }

  onBackClick(): void {
    this.router.navigate(['/rms/inventory/supplies']);
  }

  onSaveClick(): void {
    if (this.mode === 'new') {
      this.api.createSupply({
        supplierId: this.supplier.value,
        suppliedAt: this.date.value,
        comment: this.comment.value,
        itemSupplies: this.itemSupplies
      }).then(obs => obs.subscribe(() => {
        this.snackBar.open('Added supply ' + this.date.value, 'Ok');
        this.router.navigate(['/rms/inventory/supplies']);
      }));
    } else {
      this.api.updateSupply({
        id: this.supply?.id,
        supplierId: this.supplier.value,
        suppliedAt: this.date.value,
        comment: this.comment.value,
        itemSupplies: this.itemSupplies
      }).then(obs => obs.subscribe(() => {
        this.snackBar.open('Edited supply ' + this.date.value, 'Ok');
        this.router.navigate(['/rms/inventory/supplies']);
      }));
    }
  }

}
