export interface Ingredient {
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  name: string;
  barcode: string;
  unit: string;
  weightPerPiece: number;
  roundInventory: boolean;
  color: string;
  photoURL: string;
  lossClear: number;
  lossBoil: number;
  lossFry: number;
  lossStew: number;
  lossBake: number;
  cost: number;
}
