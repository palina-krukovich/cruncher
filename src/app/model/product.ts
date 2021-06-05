export interface Product {
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
  cost: number;
  price: number;
}
