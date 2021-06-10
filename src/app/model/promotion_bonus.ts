import {Item} from './item';

export interface PromotionBonus {
  id: string;
  item: Item;
  fixedPrice: number;
}
