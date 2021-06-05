import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Ingredient} from '../../../../model/ingredient';
import {Modification} from '../../../../model/modification';
import {FormControl, Validators} from '@angular/forms';
import {positiveNumberPattern} from '../../../../util/string-util';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html'
})
export class ModificationComponent implements OnInit {

  @Input() ingredients: Ingredient[] = [];
  @Input() modification: Modification = {
    id: null,
    name: '',
    ingredient: null,
    withoutWriteOff: true,
    quantity: 0,
    price: 0
  };
  @Output() modificationChange = new EventEmitter<Modification>();
  @Output() deleteClick = new EventEmitter();

  ingredientId = new FormControl(null, Validators.required);
  name = new FormControl('', Validators.required);
  quantity = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);
  price = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);

  constructor() {
  }

  ngOnInit(): void {
    if (!!this.modification) {
      this.ingredientId.setValue(this.modification.ingredient?.id || '-');
      this.quantity.setValue(this.modification.quantity);
      this.name.setValue(this.modification.name || 'No extra ingredients');
      this.price.setValue(this.modification.price / 100);
    }
    this.ingredientId.valueChanges.subscribe(value => {
      this.modification.ingredient = this.ingredients.find(ingredient => ingredient.id === value) || null;
      this.name.setValue(this.modification.ingredient?.name || 'No extra ingredients');
      this.modification.withoutWriteOff = this.ingredientId.value === '-';
      this.emitChanges();
    });
    this.quantity.valueChanges.subscribe(value => {
      if (this.quantity.valid) {
        this.modification.quantity = value;
        this.emitChanges();
      }
    });
    this.price.valueChanges.subscribe(value => {
      if (this.price.valid) {
        this.modification.price = Math.round(value * 100);
        this.emitChanges();
      }
    });
    this.name.valueChanges.subscribe(value => {
      if (this.name.valid) {
        this.modification.name = value;
        this.emitChanges();
      }
    });
  }

  get cost(): number {
    return !!this.modification && !!this.modification.ingredient
      ? Math.round(this.modification.ingredient.cost * this.modification.quantity) / 100
      : 0;
  }

  onDeleteClick(): void {
    this.deleteClick.emit();
  }

  private emitChanges(): void {
    this.modificationChange.emit(this.modification);
  }

}
