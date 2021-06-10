import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PromotionApiService} from '../../../../api/promotion-api.service';
import {Item} from '../../../../model/item';

export interface PromotionRequest {
  id: string | null;
  name: string | null;
  accrualBonuses: boolean;
  startsAt: Date | null;
  endsAt: Date | null;
  conditionRule: 'OR' | 'AND';
  conditionExactly: 'AT_LEAST' | 'EXACTLY';
  activeMonday: boolean;
  activeTuesday: boolean;
  activeWednesday: boolean;
  activeThursday: boolean;
  activeFriday: boolean;
  activeSaturday: boolean;
  activeSunday: boolean;
  result: 'BONUS_PRODUCTS' | 'DISCOUNT_AMOUNT' | 'DISCOUNT_RATE' | 'FIXED_PRICE' | null;
  bonusProductsCount: number | null;
  bonusProductsResult: 'DISCOUNT_AMOUNT' | 'DISCOUNT_RATE' | 'FIXED_PRICE' | null;
  bonusProductsResultValue: number | null;
  discountValue: number | null;
  promotionPeriods: PromotionPeriodRequest[];
  promotionConditions: PromotionConditionRequest[];
  promotionBonuses: PromotionBonusRequest[];
}

export interface PromotionPeriodRequest {
  id: string | null;
  startHours: number;
  startMinutes: number;
  endHours: number;
  endMinutes: number;
}

export interface PromotionConditionRequest {
  id: string | null;
  itemId: string | null;
  quantity: number | null;
  sum: number | null;
}

export interface PromotionBonusRequest {
  id: string | null;
  itemId: string | null;
  fixedPrice: number | null;
}

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.component.html'
})
export class NewPromotionComponent implements OnInit {

  promotion: PromotionRequest = {
    id: null,
    name: null,
    accrualBonuses: false,
    startsAt: null,
    endsAt: null,
    conditionRule: 'OR',
    conditionExactly: 'EXACTLY',
    activeMonday: true,
    activeTuesday: true,
    activeWednesday: true,
    activeThursday: true,
    activeFriday: true,
    activeSaturday: true,
    activeSunday: true,
    result: null,
    bonusProductsCount: null,
    bonusProductsResult: null,
    bonusProductsResultValue: null,
    discountValue: 0,
    promotionPeriods: [{
      id: null,
      startHours: 0,
      startMinutes: 0,
      endHours: 23,
      endMinutes: 59,
    }],
    promotionConditions: [{
      id: null,
      itemId: null,
      quantity: 1,
      sum: null
    }],
    promotionBonuses: []
  };
  items: Item[] = [];

  mode: 'new' | 'edit' = 'new';

  constructor(private api: PromotionApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getPromotion(id).then(obs => obs.subscribe(promotion => {
          this.promotion = {
            id: promotion.id,
            name: promotion.name,
            accrualBonuses: promotion.accrualBonuses,
            startsAt: promotion.startsAt,
            endsAt: promotion.endsAt,
            conditionRule: promotion.conditionRule,
            conditionExactly: promotion.conditionExactly,
            activeMonday: promotion.activeMonday,
            activeTuesday: promotion.activeTuesday,
            activeWednesday: promotion.activeWednesday,
            activeThursday: promotion.activeThursday,
            activeFriday: promotion.activeFriday,
            activeSaturday: promotion.activeSaturday,
            activeSunday: promotion.activeSunday,
            result: promotion.result,
            bonusProductsCount: promotion.bonusProductsCount,
            bonusProductsResult: promotion.bonusProductsResult,
            bonusProductsResultValue: promotion.bonusProductsResultValue,
            discountValue: promotion.discountValue,
            promotionPeriods: promotion.promotionPeriods,
            promotionConditions: promotion.promotionConditions.map(condition => ({
              id: condition.id,
              itemId: condition.item.id,
              quantity: condition.quantity,
              sum: condition.sum
            })),
            promotionBonuses: promotion.promotionBonuses.map(bonus => ({
              id: bonus.id,
              itemId: bonus.item.id,
              fixedPrice: bonus.fixedPrice
            }))
          };
          this.mode = 'edit';
        }));
      }
    });
    this.api.getPromotionItems().then(obs => obs.subscribe(items => this.items = items));
  }

  get saveDisabled(): boolean {
    return false;
  }

  onAddConditionClick(): void {
    this.promotion.promotionConditions.push({
      id: null,
      itemId: null,
      quantity: 1,
      sum: null
    });
  }

  onDeleteCondition(condition: PromotionConditionRequest): void {
    this.promotion.promotionConditions = this.promotion.promotionConditions.filter(c => c !== condition);
  }

  onAddPeriodClick(): void {
    this.promotion.promotionPeriods.push({
      id: null,
      startHours: 0,
      startMinutes: 0,
      endHours: 23,
      endMinutes: 59
    });
  }

  onDeletePeriod(period: PromotionPeriodRequest): void {
    this.promotion.promotionPeriods = this.promotion.promotionPeriods.filter(p => p !== period);
  }

  onBackClick(): void {
    this.router.navigate(['/rms/marketing/promotions']);
  }

  onSaveClick(): void {
    if (this.mode === 'new') {
      this.api.createPromotion(this.promotion)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Added Promotion ' + this.promotion.name, 'Ok');
          this.router.navigate(['/rms/marketing/promotions']);
        }));
    } else {
      this.api.updatePromotion(this.promotion)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Edited Promotion ' + this.promotion.name, 'Ok');
          this.router.navigate(['/rms/marketing/promotions']);
        }));
    }
  }

}
