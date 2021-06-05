import {RecipeIngredient} from './recipe-ingredient';

export interface Prepack {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  code: string;
  color: string;
  photoURL: string;
  productionDescription: string;
  cookTimeSeconds: number;
  recipeIngredients: RecipeIngredient[];
}
