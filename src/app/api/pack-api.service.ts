import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Pack} from '../model/pack';

@Injectable({
  providedIn: 'root'
})
export class PackApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getPacks(): Promise<Observable<Pack[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Pack[]>(`${environment.api}storage/getPacks`, {headers: header});
    });
  }

  getPack(id: string): Promise<Observable<Pack>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Pack>(`${environment.api}storage/getPack`, {params: {id}, headers: header});
    });
  }

  createPack(pack: any): Promise<Observable<Pack>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Pack>(`${environment.api}storage/createPack`, pack, {headers: header});
    });
  }

  updatePack(pack: any): Promise<Observable<Pack>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Pack>(`${environment.api}storage/updatePack`, pack, {headers: header});
    });
  }

  deletePack(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}storage/deletePack`, {headers: header, params: {id}});
    });
  }
}
