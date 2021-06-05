import { Component, OnInit } from '@angular/core';
import {Supply} from '../../../../model/supply';
import {Supplier} from '../../../../model/supplier';
import {Pack} from '../../../../model/pack';
import {Item} from '../../../../model/item';
import {FormControl, Validators} from '@angular/forms';
import {SupplyApiService} from '../../../../api/supply-api.service';
import {SupplierApiService} from '../../../../api/supplier-api.service';
import {PackApiService} from '../../../../api/pack-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ItemSupplyCreateRequest} from '../new-supply/new-supply.component';
import {Inventory} from '../../../../model/inventory';
import {InventoryApiService} from '../../../../api/inventory-api.service';

export interface ItemInventory {
  id: string | null;
  itemId: string | null;
  actualQuantity: number;
}

@Component({
  selector: 'app-new-inventory',
  templateUrl: './new-inventory.component.html'
})
export class NewInventoryComponent implements OnInit {

  private inventories: Inventory[] = [];

  items: Item[] = [];
  mode: 'new' | 'edit' = 'new';

  date = new FormControl(null, Validators.required);
  itemInventories: ItemInventory[] = [];

  constructor(private api: InventoryApiService,
              private supplyApi: SupplyApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const checkedAt = params.get('checkedAt');
      if (!!checkedAt) {
        this.api.getInventoriesByCheckedAt(new Date(checkedAt)).then(obs => obs.subscribe(inventories => {
          this.inventories = inventories;
          this.mode = 'edit';
          this.date.setValue(new Date(checkedAt));
          this.itemInventories = inventories.map(inventory => ({
            id: inventory.id,
            itemId: inventory.item.id,
            actualQuantity: inventory.actualQuantity
          }));
        }));
      }
    });
    this.supplyApi.getSuppliedItems().then(obs => obs.subscribe(items => this.items = items));
  }

  get saveDisabled(): boolean {
    return !this.date.valid;
  }

  onAddItemInventoryClick(): void {
    this.itemInventories.push({
      id: null,
      actualQuantity: 0,
      itemId: null
    });
  }

  onDeleteItemInventoryClick(itemInventory: ItemInventory): void {
    this.itemInventories = this.itemInventories.filter(i => i !== itemInventory);
  }

  onBackClick(): void {
    this.router.navigate(['/rms/inventory/inventories']);
  }

  onSaveClick(): void {
    const inv = this.itemInventories.map(itemInventory => ({
      id: itemInventory.id,
      checkedAt: this.date.value,
      itemId: itemInventory.itemId,
      actualQuantity: itemInventory.actualQuantity
    }));
    if (this.mode === 'new') {
      this.api.createInventories(inv).then(obs => obs.subscribe(() => {
        this.snackBar.open('Added inventory ' + this.date.value, 'Ok');
        this.router.navigate(['/rms/inventory/inventories']);
      }));
    } else {
      this.api.updateInventories(inv).then(obs => obs.subscribe(() => {
        this.snackBar.open('Edited inventory ' + this.date.value, 'Ok');
        this.router.navigate(['/rms/inventory/inventories']);
      }));
    }
  }
}
