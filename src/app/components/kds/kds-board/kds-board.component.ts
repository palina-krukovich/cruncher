import { Component, OnInit } from '@angular/core';
import {OrderApiService} from '../../../api/order-api.service';
import {Order} from '../../../model/order';
import {OrderItem} from '../../../model/order-item';

@Component({
  selector: 'app-kds-board',
  templateUrl: './kds-board.component.html',
  styleUrls: ['./kds-board.component.scss']
})
export class KdsBoardComponent implements OnInit {

  orders: Order[] = [];

  constructor(private api: OrderApiService) { }

  ngOnInit(): void {
    this.api.getKitchenOrders().then(obs => obs.subscribe(orders => {
      this.orders = orders.filter(order => order.items.length > 0);
    }));
  }

  onItemClick(item: OrderItem): void {
    if (item.status === 'OPEN') {
      this.api.updateOrderedItemStatus(item.id, 'IN_PROGRESS').then(obs => obs.subscribe(orders => {
        this.orders = orders.filter(order => order.items.length > 0);
      }));
    } else if (item.status === 'IN_PROGRESS') {
      this.api.updateOrderedItemStatus(item.id, 'READY').then(obs => obs.subscribe(orders => {
        this.orders = orders.filter(order => order.items.length > 0);
      }));
    }
  }
}
