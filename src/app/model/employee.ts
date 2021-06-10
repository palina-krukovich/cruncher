import {Position} from './position';

export interface Employee {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  position: Position;
  rms: boolean;
  pos: boolean;
  kds: boolean;
}
