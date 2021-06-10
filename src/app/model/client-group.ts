export interface  ClientGroup {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  loyaltyType: 'DISCOUNT' | 'CASH_BACK';
  discountRate: number;
}
