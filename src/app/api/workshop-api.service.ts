import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Workshop} from '../model/workshop';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkshopApiService {

  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getWorkshops(): Promise<Observable<Workshop[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Workshop[]>(`${environment.api}menu/getWorkshops`, {headers: header});
    });
  }

  getWorkshop(id: string): Promise<Observable<Workshop>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Workshop>(`${environment.api}menu/getWorkshop`, {params: {id}, headers: header});
    });
  }

  createWorkshop(workshop: any): Promise<Observable<Workshop>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<Workshop>(`${environment.api}menu/createWorkshop`, workshop, {headers: header});
    });
  }

  updateWorkshop(workshop: any): Promise<Observable<Workshop>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Workshop>(`${environment.api}menu/updateWorkshop`, workshop, {headers: header});
    });
  }

  deleteWorkshop(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete(`${environment.api}menu/deleteWorkshop`, {headers: header, params: {id}});
    });
  }
}
