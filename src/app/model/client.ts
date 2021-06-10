import {ClientGroup} from './client-group';

export interface Client {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  clientGroup: ClientGroup;
  gender: string;
  phone: string;
  email: string;
  birthday: Date;
  address: string;
  cardNumber: string;
  comment: string;
  discountRate: number;
}
