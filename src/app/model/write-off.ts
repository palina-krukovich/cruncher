import {Item} from './item';
import {WriteOffReason} from './write-off-reason';

export interface WriteOff {
  id: string;
  item: Item;
  writtenOffAt: Date;
  quantity: number;
  auto: boolean;
  writeOffReason: WriteOffReason;
}
