import {RecipeIngredient} from './recipe-ingredient';
import {ModificationGroup} from './modification-group';

export interface Dish {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  code: string;
  barcode: string;
  color: string;
  photoURL: string;
  categoryId: string;
  categoryName: string;
  workshopId: string;
  workshopName: string;
  noDiscount: boolean;
  price: number;
  productionDescription: string;
  cookTimeSeconds: number;
  recipeIngredients: RecipeIngredient[];
  modificationGroups: ModificationGroup[];
}
