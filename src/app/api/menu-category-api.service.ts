import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/category';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getCategories(): Promise<Observable<Category[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Category[]>(`${environment.api}menu/getCategories`, {headers: header});
    });
  }

  getCategory(id: string): Promise<Observable<Category>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Category>(`${environment.api}menu/getCategory`, {params: {id}, headers: header});
    });
  }

  getDeletedCategories(): Promise<Observable<Category[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Category[]>(`${environment.api}menu/getDeletedCategories`, {headers: header});
    });
  }

  createCategory(category: any): Promise<Observable<Category>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Category>(`${environment.api}menu/createCategory`, category, {headers: header});
    });
  }

  updateCategory(category: any): Promise<Observable<Category>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Category>(`${environment.api}menu/updateCategory`, category, {headers: header});
    });
  }

  deleteCategory(id: string): Promise<Observable<Category>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<Category>(`${environment.api}menu/deleteCategory`, {headers: header, params: {id}});
    });
  }

  recoverCategory(id: string): Promise<Observable<Category>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Category>(`${environment.api}menu/recoverCategory`, null, {headers: header, params: {id}});
    });
  }
}
