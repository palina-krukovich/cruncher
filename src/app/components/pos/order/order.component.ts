import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderApiService} from '../../../api/order-api.service';
import {Order} from '../../../model/order';
import {MenuItem, MenuItemModification} from '../../../model/menu-item';
import {MenuCategory} from '../../../model/menu-category';
import {MatDialog} from '@angular/material/dialog';
import {ModificationDialogComponent} from '../modification-dialog/modification-dialog.component';
import {OrderItem} from '../../../model/order-item';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

export interface OrderItemRequest {
  id: string;
  orderId: string;
  itemId: string;
  modificationIds: string[];
  quantity: number;
}

export interface FlatItem {
  type: 'CATEGORY' | 'ITEM';
  name: string;
  category: MenuCategory | null;
  item: MenuItem | null;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order | undefined;
  topCategory: MenuCategory = {
    id: null,
    name: 'Top Screen',
    parentCategoryId: null,
    subCategories: [],
    color: 'default-color',
    photoURL: '',
    menuItems: [],
    parentCategory: null
  };

  currentCategory = this.topCategory;

  displayedColumns = ['Name', 'Price', 'Quantity', 'Subtotal', 'Discount', 'Total'];
  dataSource = new MatTableDataSource<OrderItem>();

  searchControl = new FormControl();
  flatOptions: FlatItem[] = [];
  filteredOptions: Observable<FlatItem[]> | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: OrderApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getOrder(id).then(obs => obs.subscribe(order => {
          this.order = order;
          this.updateDataSource();
        }));
      }
    });
    this.api.getMenuCategories().then(obs => obs.subscribe(categories => {
      this.topCategory.subCategories = this.setParentCategories(categories, this.topCategory);
      this.currentCategory = this.topCategory;
      this.api.getMenuItems().then(o => o.subscribe(items => {
        this.topCategory.menuItems = items.map(item => {
          item.category = this.topCategory;
          return item;
        });
        this.getFlatOptions(this.topCategory).forEach(flatOption => this.flatOptions.push(flatOption));
      }));
    }));
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.flatOptions.slice())
      );
  }

  displayFn(flatOption: FlatItem): string {
    return !!flatOption ? flatOption.name + ' (' + (flatOption.type === 'CATEGORY' ? 'Category' : 'Menu Item') + ')' : '';
  }

  onOptionSelected(option: FlatItem): void {
    if (option.type === 'CATEGORY' && !!option.category) {
      this.currentCategory = option.category;
    } else if (!!option.item) {
      this.onItemClick(option.item);
    }
  }

  private _filter(name: string): FlatItem[] {
    const filterValue = name.toLowerCase();

    return this.flatOptions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onCategoryClick(category: MenuCategory): void {
    if (!!category.subCategories || !!category.menuItems) {
      this.currentCategory = category;
    }
  }

  onItemClick(item: MenuItem): void {
    if (!!item.modificationGroups && item.modificationGroups.length > 0) {
      this.dialog.open(ModificationDialogComponent, {
        data: item,
        width: '600px'
      }).afterClosed().subscribe((itemModifications: MenuItemModification[]) => {
        if (!!itemModifications) {
          this.api.createOrderItem({
            orderId: this.order?.id,
            itemId: item.id,
            modificationIds: itemModifications.map(itemModification => itemModification.id),
            quantity: 1
          }).then(obs => obs.subscribe(order => {
            this.order = order;
            this.updateDataSource();
          }));
        }
      });
    } else {
      this.api.createOrderItem({
        orderId: this.order?.id,
        itemId: item.id,
        modificationIds: [],
        quantity: 1
      }).then(obs => obs.subscribe(order => {
        this.order = order;
        this.updateDataSource();
      }));
    }
  }

  onChangeQuantity(orderItem: OrderItem, quantity: number): void {
    this.api.updateOrderItemQuantity(orderItem.id, quantity).then(obs => obs.subscribe(order => {
      this.order = order;
      this.updateDataSource();
    }));
  }

  onBackClick(): void {
    this.currentCategory = this.currentCategory.parentCategory || this.topCategory;
  }

  onPayClick(): void {
    this.router.navigate(['/pos/order/pay'], {queryParams: {id: this.order?.id}});
  }

  private setParentCategories(categories: MenuCategory[], parentCategory: MenuCategory | null): MenuCategory[] {
    return categories.map(category => {
      category.parentCategory = parentCategory;
      category.menuItems = category.menuItems.map(menuItem => {
        menuItem.category = category;
        return menuItem;
      });
      category.subCategories = this.setParentCategories(category.subCategories, category);
      return category;
    });
  }

  private getFlatOptions(category: MenuCategory): FlatItem[] {
    const flatOptions: FlatItem[] = category.menuItems.map(item => ({
      type: 'ITEM',
      name: item.name,
      category: null,
      item
    }));
    flatOptions.push({
      type: 'CATEGORY',
      name: category.name,
      category,
      item: null
    });
    category.subCategories.forEach(subCategory => this.getFlatOptions(subCategory).forEach(flatOption => flatOptions.push(flatOption)));
    return flatOptions;
  }

  private updateDataSource(): void {
    this.dataSource.data = this.order?.items || [];
  }

}
