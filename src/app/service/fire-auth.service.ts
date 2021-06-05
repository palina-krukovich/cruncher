import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(private auth: AngularFireAuth) { }

  public authHeader(): Promise<HttpHeaders> {
    return this.auth.currentUser
      .then(user => user?.getIdToken())
      .then(token => new HttpHeaders({Authorization: 'Bearer ' + token}));
  }
}
