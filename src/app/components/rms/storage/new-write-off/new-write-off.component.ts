import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {positiveNumberPattern} from '../../../../util/string-util';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WriteOff} from '../../../../model/write-off';
import {WriteOffApiService} from '../../../../api/write-off-api.service';
import {SupplyApiService} from '../../../../api/supply-api.service';
import {Item} from '../../../../model/item';
import {WriteOffReason} from '../../../../model/write-off-reason';
import {MatDialog} from '@angular/material/dialog';
import {NewWriteOffReasonDialogComponent} from '../new-write-off-reason-dialog/new-write-off-reason-dialog.component';

@Component({
  selector: 'app-new-write-off',
  templateUrl: './new-write-off.component.html'
})
export class NewWriteOffComponent implements OnInit {

  private writeOff: WriteOff | undefined;

  items: Item[] = [];
  writeOffReasons: WriteOffReason[] = [];

  mode: 'new' | 'edit' = 'new';
  date = new FormControl('', Validators.required);
  itemId = new FormControl(null, Validators.required);
  quantity = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);
  writeOffReasonId = new FormControl(null, Validators.required);

  constructor(private api: WriteOffApiService,
              private supplyApi: SupplyApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getWriteOff(id).then(obs => obs.subscribe(writeOff => {
          this.writeOff = writeOff;
          this.mode = 'edit';
          this.date.setValue(writeOff.writtenOffAt);
          this.itemId.setValue(writeOff.item.id);
          this.quantity.setValue(writeOff.quantity);
          this.writeOffReasonId.setValue(writeOff.writeOffReason.id);
        }));
      }
    });
    this.supplyApi.getSuppliedItems().then(obs => obs.subscribe(items => this.items = items));
    this.api.getWriteOffReasons().then(obs => obs.subscribe(reasons => this.writeOffReasons = reasons));
  }

  getUnit(): string {
    const item = this.items.find(i => i.id === this.itemId.value);
    return !!item
      ? item.itemType === 'PRODUCT'
        ? 'pcs'
        : item.unit.toLowerCase()
      : '';
  }

  get saveDisabled(): boolean {
    return !this.date.valid || !this.itemId.valid || !this.quantity.valid || !this.writeOffReasonId.valid;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/inventory/write-offs']);
  }

  onSaveClick(): void {
    const writeOff = {
      id: this.mode === 'new' ? null : this.writeOff?.id,
      itemId: this.itemId.value,
      writtenOffAt: this.date.value,
      quantity: this.quantity.value,
      auto: false,
      writeOffReasonId: this.writeOffReasonId.value
    };
    if (this.mode === 'new') {
      this.api.createWriteOff(writeOff)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Added write off', 'Ok');
          this.router.navigate(['/rms/inventory/write-offs']);
        }));
    } else {
      this.api.updateWriteOff(writeOff)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Edited write off', 'Ok');
          this.router.navigate(['/rms/inventory/write-offs']);
        }));
    }
  }

  onAddReasonClick(): void {
    this.dialog.open(NewWriteOffReasonDialogComponent, {
      width: '400px'
    }).afterClosed().subscribe(reason => {
      if (!!reason) {
        this.writeOffReasons.push(reason);
      }
    });
  }
}
