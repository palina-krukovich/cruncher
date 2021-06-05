import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Supplier} from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getSuppliers(): Promise<Observable<Supplier[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Supplier[]>(`${environment.api}storage/getSuppliers`, {headers: header});
    });
  }

  getSupplier(id: string): Promise<Observable<Supplier>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Supplier>(`${environment.api}storage/getSupplier`, {params: {id}, headers: header});
    });
  }

  createSupplier(supplier: any): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<void>(`${environment.api}storage/createSupplier`, supplier, {headers: header});
    });
  }

  updateSupplier(supplier: any): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<void>(`${environment.api}storage/updateSupplier`, supplier, {headers: header});
    });
  }

  deleteSupplier(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}storage/deleteSupplier`, {headers: header, params: {id}});
    });
  }
}
