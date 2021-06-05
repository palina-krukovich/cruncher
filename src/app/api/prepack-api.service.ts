import {Injectable} from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Prepack} from '../model/prepack';

@Injectable({
  providedIn: 'root'
})
export class PrepackApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) {
  }

  getPrepacks(): Promise<Observable<Prepack[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Prepack[]>(`${environment.api}menu/getPrepacks`, {headers: header});
    });
  }

  getPrepack(id: string): Promise<Observable<Prepack>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Prepack>(`${environment.api}menu/getPrepack`, {params: {id}, headers: header});
    });
  }

  getDeletedPrepacks(): Promise<Observable<Prepack[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Prepack[]>(`${environment.api}menu/getDeletedPrepacks`, {headers: header});
    });
  }

  createPrepack(prepack: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<any>(`${environment.api}menu/createPrepack`, prepack, {headers: header});
    });
  }

  updatePrepack(prepack: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<any>(`${environment.api}menu/updatePrepack`, prepack, {headers: header});
    });
  }

  deletePrepack(id: string): Promise<Observable<Prepack>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<Prepack>(`${environment.api}menu/deletePrepack`, {headers: header, params: {id}});
    });
  }

  recoverPrepack(id: string): Promise<Observable<Prepack>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Prepack>(`${environment.api}menu/recoverPrepack`, null, {headers: header, params: {id}});
    });
  }
}
