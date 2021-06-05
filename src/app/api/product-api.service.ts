import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getProducts(): Promise<Observable<Product[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Product[]>(`${environment.api}menu/getProducts`, {headers: header});
    });
  }

  getProduct(id: string): Promise<Observable<Product>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Product>(`${environment.api}menu/getProduct`, {params: {id}, headers: header});
    });
  }

  getDeletedProducts(): Promise<Observable<Product[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Product[]>(`${environment.api}menu/getDeletedProducts`, {headers: header});
    });
  }

  createProduct(product: any): Promise<Observable<Product>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Product>(`${environment.api}menu/createProduct`, product, {headers: header});
    });
  }

  updateProduct(product: any): Promise<Observable<Product>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Product>(`${environment.api}menu/updateProduct`, product, {headers: header});
    });
  }

  deleteProduct(id: string): Promise<Observable<Product>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<Product>(`${environment.api}menu/deleteProduct`, {headers: header, params: {id}});
    });
  }

  recoverProduct(id: string): Promise<Observable<Product>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Product>(`${environment.api}menu/recoverProduct`, null, {headers: header, params: {id}});
    });
  }
}
