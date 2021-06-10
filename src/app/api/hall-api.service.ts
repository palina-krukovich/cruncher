import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Hall} from '../model/hall';

@Injectable({
  providedIn: 'root'
})
export class HallApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getHalls(): Promise<Observable<Hall[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Hall[]>(`${environment.api}pos/getHalls`, {headers: header});
    });
  }

  getHall(id: string): Promise<Observable<Hall>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Hall>(`${environment.api}pos/getHall`, {params: {id}, headers: header});
    });
  }

  createHall(hall: any): Promise<Observable<Hall>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Hall>(`${environment.api}pos/createHall`, hall, {headers: header});
    });
  }

  updateHall(hall: any): Promise<Observable<Hall>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Hall>(`${environment.api}pos/updateHall`, hall, {headers: header});
    });
  }

  deleteHall(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}pos/deleteHall`, {headers: header, params: {id}});
    });
  }
}
