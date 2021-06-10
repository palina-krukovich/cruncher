import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Promotion} from '../model/promotion';
import {Category} from '../model/category';
import {Item} from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class PromotionApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getPromotions(): Promise<Observable<Promotion[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Promotion[]>(`${environment.api}marketing/getPromotions`, {headers: header});
    });
  }

  getPromotion(id: string): Promise<Observable<Promotion>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Promotion>(`${environment.api}marketing/getPromotion`, {params: {id}, headers: header});
    });
  }

  getPromotionItems(): Promise<Observable<Item[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Item[]>(`${environment.api}marketing/getPromotionItems`, {headers: header});
    });
  }

  createPromotion(promotion: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<any>(`${environment.api}marketing/createPromotion`, promotion, {headers: header});
    });
  }

  updatePromotion(promotion: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<any>(`${environment.api}marketing/updatePromotion`, promotion, {headers: header});
    });
  }

  deletePromotion(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<any>(`${environment.api}marketing/deletePromotion`, {headers: header, params: {id}});
    });
  }
}
