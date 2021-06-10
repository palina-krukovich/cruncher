import {Item} from './item';

export interface PromotionCondition {
  id: string;
  item: Item;
  quantity: number;
  sum: number;
}
