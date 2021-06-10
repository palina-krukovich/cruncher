import {Component, OnInit} from '@angular/core';
import {LoyaltyRule} from '../../../../model/loyalty-rule';
import {LoyaltyRuleApiService} from '../../../../api/loyalty-rule-api.service';
import {ClientGroupApiService} from '../../../../api/client-group-api.service';
import {ClientGroup} from '../../../../model/client-group';
import {isNumeric} from 'rxjs/internal-compatibility';

export interface LoyaltyRuleRequest {
  id: string | null;
  loyaltyType: 'DISCOUNT' | 'CASH_BACK';
  clientGroupId: string | null;
  value: number;
}

@Component({
  selector: 'app-loyalty-rules',
  templateUrl: './loyalty-rules.component.html',
  styleUrls: ['./loyalty-rules.component.scss']
})
export class LoyaltyRulesComponent implements OnInit {

  bonusClientGroups: ClientGroup[] = [];
  discountClientGroups: ClientGroup[] = [];
  bonusLoyaltyRules: LoyaltyRuleRequest[] = [];
  discountLoyaltyRules: LoyaltyRuleRequest[] = [];

  constructor(private api: LoyaltyRuleApiService,
              private clientGroupApi: ClientGroupApiService) {
  }

  ngOnInit(): void {
    this.api.getLoyaltyRules().then(obs => obs.subscribe(rules => this.updateRules(rules)));
    this.clientGroupApi.getClientGroups().then(obs => obs.subscribe(clientGroups => {
      this.bonusClientGroups = clientGroups.filter(group => group.loyaltyType === 'CASH_BACK');
      this.discountClientGroups = clientGroups.filter(group => group.loyaltyType === 'DISCOUNT');
    }));
  }

  onAddRuleClick(type: 'CASH_BACK' | 'DISCOUNT'): void {
    if (type === 'CASH_BACK') {
      this.bonusLoyaltyRules.push({
        id: null,
        loyaltyType: type,
        value: 0,
        clientGroupId: null
      });
    } else {
      this.discountLoyaltyRules.push({
        id: null,
        loyaltyType: type,
        value: 0,
        clientGroupId: null
      });
    }
  }

  onDeleteClick(rule: LoyaltyRuleRequest): void {
    this.bonusLoyaltyRules = this.bonusLoyaltyRules.filter(bonusRule => bonusRule !== rule);
    this.discountLoyaltyRules = this.discountLoyaltyRules.filter(discountRule => discountRule !== rule);
  }

  onSaveCLick(): void {
    const loyaltyRules: LoyaltyRuleRequest[] = [];
    this.bonusLoyaltyRules
      .filter(rule => !!rule.clientGroupId && isNumeric(rule.value) && rule.value >= 0)
      .forEach(rule => loyaltyRules.push(rule));
    this.discountLoyaltyRules
      .filter(rule => !!rule.clientGroupId && isNumeric(rule.value) && rule.value >= 0)
      .forEach(rule => loyaltyRules.push(rule));
    this.api.updateLoyaltyRules(loyaltyRules).then(obs => obs.subscribe(rules => this.updateRules(rules)));
  }

  private convertLoyaltyRule(loyaltyRule: LoyaltyRule): LoyaltyRuleRequest {
    return {
      id: loyaltyRule.id,
      loyaltyType: loyaltyRule.loyaltyType,
      clientGroupId: loyaltyRule.clientGroup.id,
      value: loyaltyRule.value
    };
  }

  private updateRules(rules: LoyaltyRule[]): void {
    this.bonusLoyaltyRules = rules
      .filter(rule => rule.loyaltyType === 'CASH_BACK')
      .map(rule => this.convertLoyaltyRule(rule));
    this.discountLoyaltyRules = rules
      .filter(rule => rule.loyaltyType === 'DISCOUNT')
      .map(rule => this.convertLoyaltyRule(rule));
  }

}
