import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {WriteOff} from '../model/write-off';
import {WriteOffReason} from '../model/write-off-reason';

@Injectable({
  providedIn: 'root'
})
export class WriteOffApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getWriteOffs(): Promise<Observable<WriteOff[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<WriteOff[]>(`${environment.api}storage/getWriteOffs`, {headers: header});
    });
  }

  getWriteOff(id: string): Promise<Observable<WriteOff>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<WriteOff>(`${environment.api}storage/getWriteOff`, {params: {id}, headers: header});
    });
  }

  getWriteOffReasons(): Promise<Observable<WriteOffReason[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<WriteOffReason[]>(`${environment.api}storage/getWriteOffReasons`, {headers: header});
    });
  }

  createWriteOff(writeOff: any): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<void>(`${environment.api}storage/createWriteOff`, writeOff, {headers: header});
    });
  }

  createWriteOffReason(writeOffReason: any): Promise<Observable<WriteOffReason>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<WriteOffReason>(`${environment.api}storage/createWriteOffReason`, writeOffReason, {headers: header});
    });
  }

  updateWriteOff(writeOff: any): Promise<Observable<void>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<void>(`${environment.api}storage/updateWriteOff`, writeOff, {headers: header});
    });
  }

  deleteWriteOff(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}storage/deleteWriteOff`, {headers: header, params: {id}});
    });
  }
}
