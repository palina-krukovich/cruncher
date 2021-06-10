import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Client} from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {
  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getClients(): Promise<Observable<Client[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Client[]>(`${environment.api}marketing/getClients`, {headers: header});
    });
  }

  getClient(id: string): Promise<Observable<Client>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Client>(`${environment.api}marketing/getClient`, {params: {id}, headers: header});
    });
  }

  getDeletedClients(): Promise<Observable<Client[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Client[]>(`${environment.api}marketing/getDeletedClients`, {headers: header});
    });
  }

  createClient(client: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<any>(`${environment.api}marketing/createClient`, client, {headers: header});
    });
  }

  updateClient(client: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<any>(`${environment.api}marketing/updateClient`, client, {headers: header});
    });
  }

  deleteClient(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<any>(`${environment.api}marketing/deleteClient`, {headers: header, params: {id}});
    });
  }

  recoverClient(id: string): Promise<Observable<Client>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Client>(`${environment.api}marketing/recoverClient`, null, {headers: header, params: {id}});
    });
  }
}
