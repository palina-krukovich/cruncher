import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Supply} from '../model/supply';
import {Item} from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class SupplyApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getSupplies(): Promise<Observable<Supply[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Supply[]>(`${environment.api}storage/getSupplies`, {headers: header});
    });
  }

  getSupply(id: string): Promise<Observable<Supply>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Supply>(`${environment.api}storage/getSupply`, {params: {id}, headers: header});
    });
  }

  getSuppliedItems(): Promise<Observable<Item[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Item[]>(`${environment.api}storage/getSuppliedItems`, {headers: header});
    });
  }

  createSupply(supply: any): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<void>(`${environment.api}storage/createSupply`, supply, {headers: header});
    });
  }

  updateSupply(supply: any): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<void>(`${environment.api}storage/updateSupply`, supply, {headers: header});
    });
  }

  deleteSupply(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}storage/deleteSupply`, {headers: header, params: {id}});
    });
  }
}
