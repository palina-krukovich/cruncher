import {Employee} from './employee';
import {Client} from './client';
import {OrderItem} from './order-item';

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  receiptNumber: number;
  tableId: string;
  tableName: string;
  employee: Employee;
  client: Client;
  status: string;
  type: string;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  totalPrice: number;
  payedCash: number;
  payedCard: number;
  payedCashBack: number;
  payedTotal: number;
  openedAt: Date;
  closedAt: Date;
  items: OrderItem[];
}
