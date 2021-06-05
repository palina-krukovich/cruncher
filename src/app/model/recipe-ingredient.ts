import {Ingredient} from './ingredient';

export interface RecipeIngredient {
  id: string | null;
  ingredient: Ingredient | null;
  grossQuantity: number;
  netQuantity: number;
  lock: boolean;
  cleared: boolean;
  boiled: boolean;
  fried: boolean;
  stewed: boolean;
  baked: boolean;
}
