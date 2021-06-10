export interface OrderItem {
  id: string;
  itemId: string;
  itemName: string;
  itemPrice: number;
  modificationNames: string[];
  promotionNames: string[];
  quantity: number;
  pricePerItem: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  totalPrice: number;
  status: string;
}
