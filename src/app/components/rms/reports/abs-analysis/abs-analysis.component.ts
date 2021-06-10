import {Component, OnInit} from '@angular/core';
import {OrderApiService} from '../../../../api/order-api.service';
import {PromotionApiService} from '../../../../api/promotion-api.service';
import {Item} from '../../../../model/item';
import {OrderItem} from '../../../../model/order-item';
import {MatTableDataSource} from '@angular/material/table';

export interface AbcItem {
  itemId: string;
  itemName: string;
  itemPrice: number;
  sales: number;
  price: number;
  consumption: number;
  salesRate: number;
  consumptionRate: number;
  category: 'A' | 'B' | 'C' | null;
}

@Component({
  selector: 'app-abs-analysis',
  templateUrl: './abs-analysis.component.html',
  styleUrls: ['./abs-analysis.component.scss']
})
export class AbsAnalysisComponent implements OnInit {

  orderItems: OrderItem[] = [];
  menuItems: Item[] = [];
  abcItems: AbcItem[] = [];
  dataSource = new MatTableDataSource<AbcItem>();
  displayedColumns = ['name', 'sales', 'price', 'consumption', 'salesRate', 'consumptionRate', 'category'];

  totalQuantity = 0;
  totalConsumption = 0;

  round = (n: number) => Math.round(n);

  constructor(private api: OrderApiService,
              private promotionApi: PromotionApiService) {
  }

  ngOnInit(): void {
    this.api.getOrderItems().then(obs => obs.subscribe(orderItems => {
      this.orderItems = orderItems;
      this.promotionApi.getPromotionItems().then(o => o.subscribe(items => {
        this.menuItems = items;
        this.init();
      }));
    }));
  }

  private init(): void {
    // 1
    this.abcItems = this.menuItems.map(menuItem => {
      const sales = this.orderItems.filter(orderItem => orderItem.itemId === menuItem.id).map(orderItem => orderItem.quantity).reduce((a, b) => a + b, 0);
      return {
        itemId: menuItem.id,
        itemName: menuItem.name,
        itemPrice: menuItem.price,
        sales,
        price: menuItem.price,
        consumption: sales * menuItem.price,
        salesRate: 0,
        consumptionRate: 0,
        category: null
      };
    });
    // 2
    this.abcItems = this.abcItems.sort((a, b) => b.consumption - a.consumption);
    // 3
    this.totalQuantity = this.abcItems.map(abcItem => abcItem.sales).reduce((a, b) => a + b, 0);
    this.totalConsumption = this.abcItems.map(abcItem => abcItem.consumption).reduce((a, b) => a + b, 0);
    // 4
    this.abcItems = this.abcItems.map(abcItem => {
      abcItem.salesRate = abcItem.sales / this.totalQuantity * 100;
      abcItem.consumptionRate = abcItem.consumption / this.totalConsumption * 100;
      return abcItem;
    });
    // 5
    if (this.abcItems.length > 0) {
      this.setCategories();
    }
    this.dataSource.data = this.abcItems;
  }

  private setCategories(): void {
    let currentCategoryRateSum = 0;
    let i = 0;
    while (currentCategoryRateSum <= 70 && i < this.abcItems.length) {
      this.abcItems[i].category = 'A';
      currentCategoryRateSum += this.abcItems[i].consumptionRate;
      i++;
    }
    currentCategoryRateSum = 0;
    i = this.abcItems[i - 1].consumptionRate > 10 ? i : i - 1;
    while (currentCategoryRateSum <= 20 && i < this.abcItems.length) {
      this.abcItems[i].category = 'B';
      currentCategoryRateSum += this.abcItems[i].consumptionRate;
      i++;
    }
    i = this.abcItems[i - 1].consumptionRate > 5 ? i : i - 1;
    while (i < this.abcItems.length) {
      this.abcItems[i].category = 'C';
      i++;
    }
  }

}
