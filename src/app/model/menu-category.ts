import {MenuItem} from './menu-item';

export interface MenuCategory {
  id: string | null;
  name: string;
  parentCategoryId: string | null;
  subCategories: MenuCategory[];
  color: string;
  photoURL: string;
  menuItems: MenuItem[];
  parentCategory: MenuCategory | null;
}
