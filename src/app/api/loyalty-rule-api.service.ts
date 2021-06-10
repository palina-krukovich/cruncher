import { Injectable } from '@angular/core';
import {FireAuthService} from '../service/fire-auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoyaltyRule} from '../model/loyalty-rule';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyRuleApiService {
  constructor(private auth: FireAuthService,
              private http: HttpClient) { }

  getLoyaltyRules(): Promise<Observable<LoyaltyRule[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<LoyaltyRule[]>(`${environment.api}marketing/getLoyaltyRules`, {headers: header});
    });
  }

  getLoyaltyRule(id: string): Promise<Observable<LoyaltyRule>> {
    return this.auth.authHeader().then(header => {
      return this.http.get<LoyaltyRule>(`${environment.api}marketing/getLoyaltyRule`, {params: {id}, headers: header});
    });
  }

  updateLoyaltyRules(loyaltyRules: any[]): Promise<Observable<LoyaltyRule[]>> {
    return this.auth.authHeader().then(header => {
      return this.http.post<LoyaltyRule[]>(`${environment.api}marketing/updateLoyaltyRules`, loyaltyRules, {headers: header});
    });
  }

}
