import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Position} from '../model/position';

@Injectable({
  providedIn: 'root'
})
export class PositionApiService {
  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getPositions(): Promise<Observable<Position[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Position[]>(`${environment.api}access/getPositions`, {headers: header});
    });
  }

  getPosition(id: string): Promise<Observable<Position>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Position>(`${environment.api}access/getPosition`, {params: {id}, headers: header});
    });
  }

  createPosition(position: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<any>(`${environment.api}access/createPosition`, position, {headers: header});
    });
  }

  updatePosition(position: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<any>(`${environment.api}access/updatePosition`, position, {headers: header});
    });
  }

  deletePosition(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}access/deletePosition`, {headers: header, params: {id}});
    });
  }
}
