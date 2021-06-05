import {Item} from './item';

export interface Inventory {
  id: string;
  checkedAt: Date;
  item: Item;
  lastInventoryCheckDate: Date;
  initialQuantity: number;
  initialValue: number;
  supplyQuantity: number;
  supplyValue: number;
  salesQuantity: number;
  salesValue: number;
  wasteQuantity: number;
  wasteValue: number;
  expectedQuantity: number;
  expectedValue: number;
  actualQuantity: number;
  actualValue: number;
  differenceQuantity: number;
  differenceValue: number;
}
