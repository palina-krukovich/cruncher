import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {MaterialModule} from './material/material.module';
import {HomeComponent} from './components/common/home/home.component';
import {LoginComponent} from './components/common/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavComponent} from './components/common/nav/nav.component';
import {IngredientsComponent} from './components/rms/menu/ingredients/ingredients.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {SidebarComponent} from './components/rms/common/sidebar/sidebar.component';
import {NgMaterialMultilevelMenuModule, MultilevelMenuService} from 'ng-material-multilevel-menu';
import {NavbarComponent} from './components/rms/common/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuCategoriesComponent} from './components/rms/menu/menu-categories/menu-categories.component';
import {ConfirmDialogComponent} from './components/rms/common/confirm-dialog/confirm-dialog.component';
import {NewMenuCategoryComponent} from './components/rms/menu/new-menu-category/new-menu-category.component';
import {ColorPickerComponent} from './components/rms/common/color-picker/color-picker.component';
import {ImageSelectComponent} from './components/rms/common/image-select/image-select.component';
import {TrashDialogComponent} from './components/rms/common/trash-dialog/trash-dialog.component';
import {NewIngredientComponent} from './components/rms/menu/new-ingredient/new-ingredient.component';
import {WorkshopsComponent} from './components/rms/menu/workshops/workshops.component';
import {NewWorkshopComponent} from './components/rms/menu/new-workshop/new-workshop.component';
import {MenuCategoryApiService} from './api/menu-category-api.service';
import {IngredientApiService} from './api/ingredient-api.service';
import {WorkshopApiService} from './api/workshop-api.service';
import {FireAuthService} from './service/fire-auth.service';
import {FireStorageService} from './service/fire-storage.service';
import {ProductApiService} from './api/product-api.service';
import {NewProductComponent} from './components/rms/menu/new-product/new-product.component';
import {ProductsComponent} from './components/rms/menu/products/products.component';
import {TableImgComponent} from './components/rms/common/table-img/table-img.component';
import {PrepacksComponent} from './components/rms/menu/prepacks/prepacks.component';
import {NewPrepackComponent} from './components/rms/menu/new-prepack/new-prepack.component';
import {RecipeComponent} from './components/rms/menu/recipe/recipe.component';
import {RecipeIngredientComponent} from './components/rms/menu/recipe-ingredient/recipe-ingredient.component';
import {DishesComponent} from './components/rms/menu/dishes/dishes.component';
import {NewDishComponent} from './components/rms/menu/new-dish/new-dish.component';
import {ModifiersComponent} from './components/rms/menu/modifiers/modifiers.component';
import {ModificationComponent} from './components/rms/menu/modification/modification.component';
import {NewModifierDialogComponent} from './components/rms/menu/new-modifier-dialog/new-modifier-dialog.component';
import {NewPackComponent} from './components/rms/storage/new-pack/new-pack.component';
import {PacksComponent} from './components/rms/storage/packs/packs.component';
import {SuppliersComponent} from './components/rms/storage/suppliers/suppliers.component';
import {NewSupplierComponent} from './components/rms/storage/new-supplier/new-supplier.component';
import {NewSupplyComponent} from './components/rms/storage/new-supply/new-supply.component';
import {SuppliesComponent} from './components/rms/storage/supplies/supplies.component';
import {NgxMaskModule} from 'ngx-mask';
import {ItemSupplyComponent} from './components/rms/storage/item-supply/item-supply.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {WriteOffsComponent} from './components/rms/storage/write-offs/write-offs.component';
import {NewWriteOffComponent} from './components/rms/storage/new-write-off/new-write-off.component';
import {NewWriteOffReasonDialogComponent} from './components/rms/storage/new-write-off-reason-dialog/new-write-off-reason-dialog.component';
import {NewInventoryComponent} from './components/rms/storage/new-inventory/new-inventory.component';
import {InventoriesComponent} from './components/rms/storage/inventories/inventories.component';
import {ViewInventoryComponent} from './components/rms/storage/view-inventory/view-inventory.component';
import {ItemInventoryComponent} from './components/rms/storage/item-inventory/item-inventory.component';
import {StockComponent} from './components/rms/storage/stock/stock.component';
import {PosNavComponent} from './components/pos/pos-nav/pos-nav.component';
import {BoardComponent} from './components/pos/board/board.component';
import {ResizableDraggableComponent} from './components/pos/resizable-draggable/resizable-draggable.component';
import {NewBoardComponent} from './components/pos/new-board/new-board.component';
import {OrderComponent} from './components/pos/order/order.component';
import {EmployeesComponent} from './components/rms/access/employees/employees.component';
import {NewEmployeeComponent} from './components/rms/access/new-employee/new-employee.component';
import {PositionsComponent} from './components/rms/access/positions/positions.component';
import {NewPositionComponent} from './components/rms/access/new-position/new-position.component';
import {ClientsComponent} from './components/rms/marketing/clients/clients.component';
import {ClientGroupsComponent} from './components/rms/marketing/client-groups/client-groups.component';
import {LoyaltyRulesComponent} from './components/rms/marketing/loyalty-rules/loyalty-rules.component';
import {NewClientComponent} from './components/rms/marketing/new-client/new-client.component';
import {NewClientGroupComponent} from './components/rms/marketing/new-client-group/new-client-group.component';
import {NewPromotionComponent} from './components/rms/marketing/new-promotion/new-promotion.component';
import {PromotionsComponent} from './components/rms/marketing/promotions/promotions.component';
import {MatTimepickerModule} from 'mat-timepicker';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {ModificationDialogComponent} from './components/pos/modification-dialog/modification-dialog.component';
import {PayComponent} from './components/pos/pay/pay.component';
import {SalesComponent} from './components/rms/reports/sales/sales.component';
import {TablesComponent} from './components/rms/reports/tables/tables.component';
import {CategoriesComponent} from './components/rms/reports/categories/categories.component';
import {ProductsRepostComponent} from './components/rms/reports/products-repost/products-repost.component';
import {AbsAnalysisComponent} from './components/rms/reports/abs-analysis/abs-analysis.component';
import {PaymentsComponent} from './components/rms/reports/payments/payments.component';
import {EmployeesReportComponent} from './components/rms/reports/employees-report/employees-report.component';
import {ChartsModule} from 'ng2-charts';
import { KdsBoardComponent } from './components/kds/kds-board/kds-board.component';
import { KdsNavComponent } from './components/kds/kds-nav/kds-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    IngredientsComponent,
    SidebarComponent,
    NavbarComponent,
    MenuCategoriesComponent,
    ConfirmDialogComponent,
    NewMenuCategoryComponent,
    ColorPickerComponent,
    ImageSelectComponent,
    TrashDialogComponent,
    NewIngredientComponent,
    WorkshopsComponent,
    NewWorkshopComponent,
    NewProductComponent,
    ProductsComponent,
    TableImgComponent,
    PrepacksComponent,
    NewPrepackComponent,
    RecipeComponent,
    RecipeIngredientComponent,
    DishesComponent,
    NewDishComponent,
    ModifiersComponent,
    ModificationComponent,
    NewModifierDialogComponent,
    NewPackComponent,
    PacksComponent,
    SuppliersComponent,
    NewSupplierComponent,
    NewSupplyComponent,
    SuppliesComponent,
    ItemSupplyComponent,
    WriteOffsComponent,
    NewWriteOffComponent,
    NewWriteOffReasonDialogComponent,
    NewInventoryComponent,
    InventoriesComponent,
    ViewInventoryComponent,
    ItemInventoryComponent,
    StockComponent,
    PosNavComponent,
    BoardComponent,
    ResizableDraggableComponent,
    NewBoardComponent,
    OrderComponent,
    EmployeesComponent,
    NewEmployeeComponent,
    PositionsComponent,
    NewPositionComponent,
    ClientsComponent,
    ClientGroupsComponent,
    LoyaltyRulesComponent,
    NewClientComponent,
    NewClientGroupComponent,
    NewPromotionComponent,
    PromotionsComponent,
    ModificationDialogComponent,
    PayComponent,
    SalesComponent,
    TablesComponent,
    CategoriesComponent,
    ProductsRepostComponent,
    AbsAnalysisComponent,
    PaymentsComponent,
    EmployeesReportComponent,
    KdsBoardComponent,
    KdsNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireStorageModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, undefined, {authGuardLoggedInURL: 'home'}),
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgMaterialMultilevelMenuModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTimepickerModule,
    ChartsModule
  ],
  providers: [
    MultilevelMenuService,
    FireAuthService,
    FireStorageService,
    MenuCategoryApiService,
    IngredientApiService,
    WorkshopApiService,
    ProductApiService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
