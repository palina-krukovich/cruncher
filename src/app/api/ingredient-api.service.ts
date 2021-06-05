import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Ingredient} from '../model/ingredient';
import {environment} from '../../environments/environment';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getIngredients(): Promise<Observable<Ingredient[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Ingredient[]>(`${environment.api}menu/getIngredients`, {headers: header});
    });
  }

  getIngredient(id: string): Promise<Observable<Ingredient>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Ingredient>(`${environment.api}menu/getIngredient`, {params: {id}, headers: header});
    });
  }

  getDeletedIngredients(): Promise<Observable<Ingredient[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Ingredient[]>(`${environment.api}menu/getDeletedIngredients`, {headers: header});
    });
  }

  getIngredientsForRecipe(): Promise<Observable<Ingredient[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Ingredient[]>(`${environment.api}menu/getIngredientsForRecipe`, {headers: header});
    });
  }

  createIngredient(ingredient: any): Promise<Observable<Ingredient>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Ingredient>(`${environment.api}menu/createIngredient`, ingredient, {headers: header});
    });
  }

  updateIngredient(ingredient: any): Promise<Observable<Ingredient>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Ingredient>(`${environment.api}menu/updateIngredient`, ingredient, {headers: header});
    });
  }

  deleteIngredient(id: string): Promise<Observable<Ingredient>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<Ingredient>(`${environment.api}menu/deleteIngredient`, {headers: header, params: {id}});
    });
  }

  recoverIngredient(id: string): Promise<Observable<Ingredient>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Ingredient>(`${environment.api}menu/recoverIngredient`, null, {headers: header, params: {id}});
    });
  }
}
