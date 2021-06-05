export interface Category {
  id: string;
  name: string;
  parentCategoryId: string;
  subCategories: Category[];
  color: string;
  photoURL: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
