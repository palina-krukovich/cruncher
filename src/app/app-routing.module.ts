import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate, hasCustomClaim, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {LoginComponent} from './components/common/login/login.component';
import {HomeComponent} from './components/common/home/home.component';
import {IngredientsComponent} from './components/rms/menu/ingredients/ingredients.component';
import {MenuCategoriesComponent} from './components/rms/menu/menu-categories/menu-categories.component';
import {NewMenuCategoryComponent} from './components/rms/menu/new-menu-category/new-menu-category.component';
import {NewIngredientComponent} from './components/rms/menu/new-ingredient/new-ingredient.component';
import {WorkshopsComponent} from './components/rms/menu/workshops/workshops.component';
import {NewWorkshopComponent} from './components/rms/menu/new-workshop/new-workshop.component';
import {NewProductComponent} from './components/rms/menu/new-product/new-product.component';
import {ProductsComponent} from './components/rms/menu/products/products.component';
import {PrepacksComponent} from './components/rms/menu/prepacks/prepacks.component';
import {NewPrepackComponent} from './components/rms/menu/new-prepack/new-prepack.component';
import {DishesComponent} from './components/rms/menu/dishes/dishes.component';
import {NewDishComponent} from './components/rms/menu/new-dish/new-dish.component';
import {PacksComponent} from './components/rms/storage/packs/packs.component';
import {NewPackComponent} from './components/rms/storage/new-pack/new-pack.component';
import {SuppliesComponent} from './components/rms/storage/supplies/supplies.component';
import {NewSupplyComponent} from './components/rms/storage/new-supply/new-supply.component';
import {SuppliersComponent} from './components/rms/storage/suppliers/suppliers.component';
import {NewSupplierComponent} from './components/rms/storage/new-supplier/new-supplier.component';
import {WriteOffsComponent} from './components/rms/storage/write-offs/write-offs.component';
import {NewWriteOffComponent} from './components/rms/storage/new-write-off/new-write-off.component';
import {InventoriesComponent} from './components/rms/storage/inventories/inventories.component';
import {NewInventoryComponent} from './components/rms/storage/new-inventory/new-inventory.component';
import {ViewInventoryComponent} from './components/rms/storage/view-inventory/view-inventory.component';
import {StockComponent} from './components/rms/storage/stock/stock.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const hasRmsPermission = () => hasCustomClaim('rms');
const hasPosPermission = () => hasCustomClaim('pos');
const hasKdsPermission = () => hasCustomClaim('kds');

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome)},
  {path: 'home',  component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'rms/menu/ingredients', component: IngredientsComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/ingredients/new', component: NewIngredientComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/menu-categories', component: MenuCategoriesComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/menu-categories/new', component: NewMenuCategoryComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/workshops', component: WorkshopsComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/workshops/new', component: NewWorkshopComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/products', component: ProductsComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/products/new', component: NewProductComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/prepacks', component: PrepacksComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/prepacks/new', component: NewPrepackComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/dishes', component: DishesComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/menu/dishes/new', component: NewDishComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/packs', component: PacksComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/packs/new', component: NewPackComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/suppliers', component: SuppliersComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/suppliers/new', component: NewSupplierComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/supplies', component: SuppliesComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/supplies/new', component: NewSupplyComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/write-offs', component: WriteOffsComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/write-offs/new', component: NewWriteOffComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/inventories', component: InventoriesComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/inventories/new', component: NewInventoryComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/inventories/view', component: ViewInventoryComponent, ...canActivate(hasRmsPermission)},
  {path: 'rms/inventory/stock', component: StockComponent, ...canActivate(hasRmsPermission)},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
