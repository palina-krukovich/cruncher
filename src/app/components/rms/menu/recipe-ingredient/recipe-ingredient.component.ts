import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Ingredient} from '../../../../model/ingredient';
import {RecipeIngredient} from '../../../../model/recipe-ingredient';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html'
})
export class RecipeIngredientComponent implements OnInit {

  @Input() ingredients: Ingredient[] | undefined;
  @Input() recipeIngredient: RecipeIngredient | undefined;
  @Output() recipeIngredientChange = new EventEmitter<RecipeIngredient>();
  @Output() deleteClick = new EventEmitter();

  ingredient: Ingredient | null = null;
  ingredientId: string | null = null;
  grossQuantity = 0;
  netQuantity = 0;
  lock = true;
  cleared = false;
  boiled = false;
  fried = false;
  stewed = false;
  baked = false;
  cost = 0;

  constructor() {
  }

  ngOnInit(): void {
    if (!!this.recipeIngredient) {
      this.ingredientId = this.recipeIngredient.ingredient?.id || null;
      this.ingredient = this.recipeIngredient.ingredient;
      this.grossQuantity = this.recipeIngredient.grossQuantity;
      this.netQuantity = this.recipeIngredient.netQuantity;
      this.lock = this.recipeIngredient.lock;
      this.cleared = this.recipeIngredient.cleared;
      this.boiled = this.recipeIngredient.boiled;
      this.fried = this.recipeIngredient.fried;
      this.stewed = this.recipeIngredient.stewed;
      this.baked = this.recipeIngredient.baked;
      this.cost = this.getCost();
    }
  }

  toggleLock(): void {
    this.lock = !this.lock;
  }

  update(): void {
    this.ingredient = this.ingredients?.find(ingredient => ingredient.id === this.ingredientId) || null;
    this.netQuantity = this.getNetQuantity();
    this.cost = this.getCost();
  }

  onChange(): void {
    this.recipeIngredient = {
      id: null,
      ingredient: this.ingredient,
      grossQuantity: this.grossQuantity,
      netQuantity: this.netQuantity,
      lock: this.lock,
      cleared: this.cleared,
      boiled: this.boiled,
      fried: this.fried,
      stewed: this.stewed,
      baked: this.baked
    };
    this.recipeIngredientChange.emit(this.recipeIngredient);
  }

  onDeleteClick(): void {
    this.deleteClick.emit();
  }

  getNetQuantity(): number {
    if (!this.lock || !this.ingredient || !this.grossQuantity) {
      return this.netQuantity || 0;
    }
    let net;
    if (this.ingredient.unit === 'KG') {
      net = this.grossQuantity * (1 - (this.cleared ? this.ingredient.lossClear : 0) / 100)
        * (1 - (this.boiled ? this.ingredient.lossBoil : 0) / 100)
        * (1 - (this.fried ? this.ingredient.lossFry : 0) / 100)
        * (1 - (this.stewed ? this.ingredient.lossStew : 0) / 100)
        * (1 - (this.baked ? this.ingredient.lossBake : 0) / 100);
    } else if (this.ingredient.unit === 'PCS') {
      net = this.grossQuantity * this.ingredient.weightPerPiece;
    } else {
      net = this.grossQuantity;
    }
    return Math.round(net * 1000) / 1000;
  }

  private getCost(): number {
    return (!!this.ingredient && !!this.grossQuantity) ? Math.round(this.ingredient.cost * this.grossQuantity) : 0;
  }
}
