import {Modification} from './modification';

export interface ModificationGroup {
  id: string | null;
  name: string;
  type: 'CHOOSE_ONE' | 'CHOOSE_MULTIPLE';
  minNum: number;
  maxNum: number;
  modifications: Modification[];
}
