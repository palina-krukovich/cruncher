import {Injectable} from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Inventory} from '../model/inventory';
import {Stock} from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) {
  }

  getInventories(): Promise<Observable<Inventory[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Inventory[]>(`${environment.api}storage/getInventories`, {headers: header});
    });
  }

  getStock(): Promise<Observable<Stock[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Stock[]>(`${environment.api}storage/getStock`, {headers: header});
    });
  }

  getInventory(id: string): Promise<Observable<Inventory>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Inventory>(`${environment.api}storage/getInventory`, {params: {id}, headers: header});
    });
  }

  getInventoriesByCheckedAt(checkedAt: Date): Promise<Observable<Inventory[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Inventory[]>(`${environment.api}storage/getInventoriesByCheckedAt`,
        {params: {checkedAt: checkedAt.toISOString()}, headers: header});
    });
  }

  createInventories(inventories: any[]): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<void>(`${environment.api}storage/createInventories`, inventories, {headers: header});
    });
  }

  updateInventories(inventories: any[]): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<void>(`${environment.api}storage/updateInventories`, inventories, {headers: header});
    });
  }

  deleteInventories(ids: string[]): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}storage/deleteInventories`, {headers: header, params: {ids}});
    });
  }
}
