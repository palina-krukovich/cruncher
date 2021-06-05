import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Ingredient} from '../../../../model/ingredient';
import {RecipeIngredient} from '../../../../model/recipe-ingredient';
import {IngredientApiService} from '../../../../api/ingredient-api.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit {

  ingredients: Ingredient[] | undefined;
  @Input() recipeIngredients: RecipeIngredient[] = [];
  @Output() recipeIngredientsChange = new EventEmitter<RecipeIngredient[]>();

  constructor(private api: IngredientApiService) {
  }

  ngOnInit(): void {
    this.api.getIngredientsForRecipe().then(obs => obs.subscribe(ingredients => {
      this.ingredients = ingredients;
    }));
  }

  get totalWeight(): number {
    const totalWeight = this.recipeIngredients
      .map(recipeIngredient => recipeIngredient.netQuantity)
      .reduce((acc: number, curr: number) => acc + curr, 0);
    return Math.round(totalWeight * 1000) / 1000;
  }

  get totalCost(): number {
    const totalCost = this.recipeIngredients
      .map(recipeIngredient => (!!recipeIngredient.ingredient && !!recipeIngredient.grossQuantity)
        ? Math.round(recipeIngredient.ingredient.cost * recipeIngredient.grossQuantity)
        : 0)
      .reduce((acc: number, curr: number) => acc + curr, 0);
    return Math.round(totalCost) / 100;
  }

  add(): void {
    this.recipeIngredients.push({
      id: null,
      ingredient: null,
      grossQuantity: 0,
      netQuantity: 0,
      lock: true,
      cleared: false,
      boiled: false,
      fried: false,
      stewed: false,
      baked: false
    });
  }

  onDeleteClick(recipeIngredient: RecipeIngredient): void {
    this.recipeIngredients = this.recipeIngredients.filter(ri => ri !== recipeIngredient);
    this.recipeIngredientsChange.emit(this.recipeIngredients);
  }

  onChange(): void {
    this.recipeIngredientsChange.emit(this.recipeIngredients);
  }
}
