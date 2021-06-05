import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SupplierApiService} from '../../../../api/supplier-api.service';
import {Supplier} from '../../../../model/supplier';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html'
})
export class NewSupplierComponent implements OnInit {
  private supplier: Supplier | undefined;

  mode: 'new' | 'edit' = 'new';
  name = new FormControl('', Validators.required);
  address = new FormControl('');
  phoneNumber = new FormControl('');
  comment = new FormControl('');

  constructor(private api: SupplierApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getSupplier(id).then(obs => obs.subscribe(supplier => {
          this.supplier = supplier;
          this.mode = 'edit';
          this.name.setValue(supplier.name);
          this.address.setValue(supplier.address);
          this.phoneNumber.setValue(supplier.phoneNumber);
          this.comment.setValue(supplier.comment);
        }));
      }
    });
  }

  get saveDisabled(): boolean {
    return !this.name.valid;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/inventory/suppliers']);
  }

  onSaveClick(): void {
    if (this.mode === 'new') {
      this.api.createSupplier({
        name: this.name.value,
        address: this.address.value,
        phoneNumber: this.phoneNumber.value,
        comment: this.comment.value
      }).then(obs => obs.subscribe(() => {
        this.snackBar.open('Added supplier ' + this.name.value, 'Ok');
        this.router.navigate(['/rms/inventory/suppliers']);
      }));
    } else {
      this.api.updateSupplier({
        id: this.supplier?.id,
        name: this.name.value,
        address: this.address.value,
        phoneNumber: this.phoneNumber.value,
        comment: this.comment.value
      }).then(obs => obs.subscribe(() => {
        this.snackBar.open('Edited supplier ' + this.name.value, 'Ok');
        this.router.navigate(['/rms/inventory/suppliers']);
      }));
    }
  }
}
