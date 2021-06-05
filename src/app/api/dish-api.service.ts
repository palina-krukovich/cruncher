import {Injectable} from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Dish} from '../model/dish';

@Injectable({
  providedIn: 'root'
})
export class DishApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) {
  }

  getDishes(): Promise<Observable<Dish[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Dish[]>(`${environment.api}menu/getDishes`, {headers: header});
    });
  }

  getDish(id: string): Promise<Observable<Dish>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Dish>(`${environment.api}menu/getDish`, {params: {id}, headers: header});
    });
  }

  getDeletedDishes(): Promise<Observable<Dish[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Dish[]>(`${environment.api}menu/getDeletedDishes`, {headers: header});
    });
  }

  createDish(dish: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<any>(`${environment.api}menu/createDish`, dish, {headers: header});
    });
  }

  updateDish(dish: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<any>(`${environment.api}menu/updateDish`, dish, {headers: header});
    });
  }

  deleteDish(id: string): Promise<Observable<Dish>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<Dish>(`${environment.api}menu/deleteDish`, {headers: header, params: {id}});
    });
  }

  recoverDish(id: string): Promise<Observable<Dish>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Dish>(`${environment.api}menu/recoverDish`, null, {headers: header, params: {id}});
    });
  }
}
