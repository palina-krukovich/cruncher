import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../model/item';
import {FormControl, Validators} from '@angular/forms';
import {positiveNumberPattern} from '../../../../util/string-util';
import {ItemInventory} from '../new-inventory/new-inventory.component';

@Component({
  selector: 'app-item-inventory',
  templateUrl: './item-inventory.component.html'
})
export class ItemInventoryComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() itemInventory: ItemInventory = {
    id: null,
    itemId: null,
    actualQuantity: 0
  };
  @Output() itemInventoryChange = new EventEmitter<ItemInventory>();
  @Output() deleteClick = new EventEmitter();

  itemId = new FormControl(null, Validators.required);
  actualQuantity = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);

  constructor() {
  }

  ngOnInit(): void {
    if (!!this.itemInventory) {
      this.itemId.setValue(this.itemInventory.itemId);
      this.actualQuantity.setValue(this.itemInventory.actualQuantity);
    }
    this.itemId.valueChanges.subscribe(itemId => {
      this.itemInventory.itemId = itemId;
      this.itemInventoryChange.emit(this.itemInventory);
    });
    this.actualQuantity.valueChanges.subscribe(actualQuantity => {
      this.itemInventory.actualQuantity = this.actualQuantity.value;
      this.itemInventoryChange.emit(this.itemInventory);
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
    return this.items.find(item => item.id === this.itemInventory.itemId);
  }

  onDeleteClick(): void {
    this.deleteClick.emit();
  }

}
