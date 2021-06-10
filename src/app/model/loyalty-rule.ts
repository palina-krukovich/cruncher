import {ClientGroup} from './client-group';

export interface LoyaltyRule {
  id: string;
  loyaltyType: 'DISCOUNT' | 'CASH_BACK';
  value: number;
  clientGroup: ClientGroup;
}
