export interface DiningTable {
  id: string;
  name: string;
  capacity: number;
  shape: 'CIRCLE' | 'RECT';
  x: number;
  y: number;
  width: number;
  height: number;
  hasActiveOrders: boolean;
  orders: [{
    orderId: string;
    receiptNumber: number;
  }];
}
