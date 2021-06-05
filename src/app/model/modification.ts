import {Ingredient} from './ingredient';

export interface Modification {
  id: string | null;
  name: string;
  ingredient: Ingredient | null;
  withoutWriteOff: boolean;
  quantity: number;
  price: number;
}
