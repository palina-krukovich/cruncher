import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Employee} from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getEmployees(): Promise<Observable<Employee[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Employee[]>(`${environment.api}access/getEmployees`, {headers: header});
    });
  }

  getEmployee(id: string): Promise<Observable<Employee>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Employee>(`${environment.api}access/getEmployee`, {params: {id}, headers: header});
    });
  }

  getDeletedEmployees(): Promise<Observable<Employee[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<Employee[]>(`${environment.api}access/getDeletedEmployees`, {headers: header});
    });
  }

  createEmployee(employee: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<any>(`${environment.api}access/createEmployee`, employee, {headers: header});
    });
  }

  updateEmployee(employee: any): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<any>(`${environment.api}access/updateEmployee`, employee, {headers: header});
    });
  }

  deleteEmployee(id: string): Promise<Observable<any>> {
    return this.auth.authHeader().then(header => {
      return this.http.delete<any>(`${environment.api}access/deleteEmployee`, {headers: header, params: {id}});
    });
  }

  recoverEmployee(id: string): Promise<Observable<Employee>> {
    return this.auth.authHeader().then(header => {
      return this.http.put<Employee>(`${environment.api}access/recoverEmployee`, null, {headers: header, params: {id}});
    });
  }
}
