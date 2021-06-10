import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ClientGroup} from '../model/client-group';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupApiService {
  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getClientGroups(): Promise<Observable<ClientGroup[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<ClientGroup[]>(`${environment.api}marketing/getClientGroups`, {headers: header});
    });
  }

  getClientGroup(id: string): Promise<Observable<ClientGroup>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<ClientGroup>(`${environment.api}marketing/getClientGroup`, {params: {id}, headers: header});
    });
  }

  getDeletedClientGroups(): Promise<Observable<ClientGroup[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<ClientGroup[]>(`${environment.api}marketing/getDeletedClientGroups`, {headers: header});
    });
  }

  createClientGroup(clientGroup: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<any>(`${environment.api}marketing/createClientGroup`, clientGroup, {headers: header});
    });
  }

  updateClientGroup(clientGroup: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<any>(`${environment.api}marketing/updateClientGroup`, clientGroup, {headers: header});
    });
  }

  deleteClientGroup(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<any>(`${environment.api}marketing/deleteClientGroup`, {headers: header, params: {id}});
    });
  }

  recoverClientGroup(id: string): Promise<Observable<ClientGroup>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<ClientGroup>(`${environment.api}marketing/recoverClientGroup`, null, {headers: header, params: {id}});
    });
  }
}
