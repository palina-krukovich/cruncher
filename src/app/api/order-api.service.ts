import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Order} from '../model/order';
import {MenuCategory} from '../model/menu-category';
import {MenuItem} from '../model/menu-item';
import {OrderItem} from '../model/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getOrders(): Promise<Observable<Order[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Order[]>(`${environment.api}pos/getOrders`, {headers: header});
    });
  }

  getOrderItems(): Promise<Observable<OrderItem[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<OrderItem[]>(`${environment.api}pos/getOrderItems`, {headers: header});
    });
  }

  getOrder(id: string): Promise<Observable<Order>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Order>(`${environment.api}pos/getOrder`, {params: {id}, headers: header});
    });
  }

  createOrder(order: any): Promise<Observable<Order>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Order>(`${environment.api}pos/createOrder`, order, {headers: header});
    });
  }

  getMenuCategories(): Promise<Observable<MenuCategory[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<MenuCategory[]>(`${environment.api}pos/getMenuCategories`, {headers: header});
    });
  }

  getMenuItems(): Promise<Observable<MenuItem[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<MenuItem[]>(`${environment.api}pos/getMenuItems`, {headers: header});
    });
  }

  createOrderItem(orderItem: any): Promise<Observable<Order>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Order>(`${environment.api}pos/createOrderItem`, orderItem, {headers: header});
    });
  }

  updateOrderItemQuantity(id: string, quantity: number): Promise<Observable<Order>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Order>(`${environment.api}pos/updateOrderItemQuantity`, null, {
        params: {id, quantity: quantity.toString()},
        headers: header
      });
    });
  }

  closeOrder(orderId: string, payedCard: number, payedCash: number): Promise<Observable<Order>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Order>(`${environment.api}pos/closeOrder`, null, {
        params: {orderId, payedCard: payedCard.toString(), payedCash: payedCash.toString()},
        headers: header
      });
    });
  }

  cancelOrder(orderId: string): Promise<Observable<Order>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Order>(`${environment.api}pos/cancelOrder`, null, {params: {orderId}, headers: header});
    });
  }

  sendToKitchen(orderId: string): Promise<Observable<Order>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Order>(`${environment.api}pos/sendToKitchen`, null, {params: {orderId}, headers: header});
    });
  }

  getKitchenOrders(): Promise<Observable<Order[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Order[]>(`${environment.api}pos/getKitchenOrders`, {headers: header});
    });
  }

  updateOrderedItemStatus(orderItemId: string, status: string): Promise<Observable<Order[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Order[]>(`${environment.api}pos/updateOrderedItemStatus`, {params: {orderItemId, status}, headers: header});
    });
  }
}
