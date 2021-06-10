import {Workshop} from './workshop';
import {MenuCategory} from './menu-category';

export interface MenuItem {
  id: string;
  type: 'DISH' | 'PRODUCT';
  name: string;
  categoryId: string;
  category: MenuCategory | null;
  code: string;
  barcode: string;
  color: string;
  photoURL: string;
  productionDescription: string;
  cookTimeSeconds: number;
  workshop: Workshop;
  noDiscount: boolean;
  price: number;
  modificationGroups: MenuItemModificationGroup[];
}

export interface MenuItemModificationGroup {
  id: string;
  name: string;
  type: 'CHOOSE_ONE' | 'CHOOSE_MULTIPLE';
  minNum: number;
  maxNum: number;
  modifications: MenuItemModification[];
}

export interface MenuItemModification {
  id: string;
  name: string;
  price: number;
}
