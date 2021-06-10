import {DiningTable} from './dining-table';

export interface Hall {
  id: string;
  name: string;
  tables: DiningTable[];
}
