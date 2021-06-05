import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Pack} from '../../../../model/pack';
import {Item} from '../../../../model/item';
import {ItemSupplyCreateRequest} from '../new-supply/new-supply.component';
import {FormControl, Validators} from '@angular/forms';
import {positiveNumberPattern} from '../../../../util/string-util';

@Component({
  selector: 'app-item-supply',
  templateUrl: './item-supply.component.html'
})
export class ItemSupplyComponent implements OnInit {

  @Input() packs: Pack[] = [];
  @Input() suppliedItems: Item[] = [];
  @Input() itemSupply: ItemSupplyCreateRequest = {
    itemId: null,
    packId: null,
    quantity: 0,
    pricePerUnit: 0
  };
  @Output() itemSupplyChange = new EventEmitter<ItemSupplyCreateRequest>();
  @Output() deleteClick = new EventEmitter();

  itemId = new FormControl(null, Validators.required);
  unit = new FormControl(null, Validators.required);
  quantity = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);
  pricePerUnit = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);
  totalAmount = 0;

  constructor() {
  }

  ngOnInit(): void {
    if (!!this.itemSupply) {
      this.itemId.setValue(this.itemSupply.itemId);
      this.unit.setValue(this.itemSupply.packId || '-');
      this.quantity.setValue(this.itemSupply.quantity);
      this.pricePerUnit.setValue(this.itemSupply.pricePerUnit / 100);
    }
    this.itemId.valueChanges.subscribe(itemId => {
      this.itemSupply.itemId = itemId;
      this.itemSupplyChange.emit(this.itemSupply);
    });
    this.unit.valueChanges.subscribe(unit => {
      this.itemSupply.packId = this.unit.value === '-' ? null : this.unit.value;
      this.itemSupplyChange.emit(this.itemSupply);
    });
    this.quantity.valueChanges.subscribe(quantity => {
      this.itemSupply.quantity = this.quantity.value;
      this.itemSupplyChange.emit(this.itemSupply);
    });
    this.pricePerUnit.valueChanges.subscribe(pricePerUnit => {
      this.itemSupply.pricePerUnit = Math.round(this.pricePerUnit.value * 100);
      this.itemSupplyChange.emit(this.itemSupply);
    });
  }

  get defaultUnit(): string | null {
    return this.currentItem?.itemType === 'INGREDIENT'
      ? this.currentItem.unit.toLowerCase()
      : this.currentItem?.itemType === 'PRODUCT'
        ? 'pcs'
        : null;
  }

  get currentItem(): Item | undefined {
    return this.suppliedItems.find(item => item.id === this.itemSupply.itemId);
  }

  get totalPrice(): number {
    return (this.itemSupply.quantity * this.itemSupply.pricePerUnit / 100) || 0;
  }

  onDeleteClick(): void {
    this.deleteClick.emit();
  }

}
