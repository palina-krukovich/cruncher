import {ItemSupply} from './item-supply';

export interface Supply {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  supplierId: string;
  supplierName: string;
  suppliedAt: Date;
  comment: string;
  itemSupplies: ItemSupply[];
}
