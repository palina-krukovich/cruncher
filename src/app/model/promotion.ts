import {PromotionPeriod} from './promotion-period';
import {PromotionCondition} from './promotion-condition';
import {PromotionBonus} from './promotion_bonus';

export interface Promotion {
  id: string;
  name: string;
  accrualBonuses: boolean;
  startsAt: Date;
  endsAt: Date;
  conditionRule: 'OR' | 'AND';
  conditionExactly: 'AT_LEAST' | 'EXACTLY';
  activeMonday: boolean;
  activeTuesday: boolean;
  activeWednesday: boolean;
  activeThursday: boolean;
  activeFriday: boolean;
  activeSaturday: boolean;
  activeSunday: boolean;
  result: 'BONUS_PRODUCTS' | 'DISCOUNT_AMOUNT' | 'DISCOUNT_RATE' | 'FIXED_PRICE';
  bonusProductsCount: number;
  bonusProductsResult: 'DISCOUNT_AMOUNT' | 'DISCOUNT_RATE' | 'FIXED_PRICE';
  bonusProductsResultValue: number;
  discountValue: number;
  promotionPeriods: PromotionPeriod[];
  promotionConditions: PromotionCondition[];
  promotionBonuses: PromotionBonus[];
}
