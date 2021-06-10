package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class PromotionRequest {
    private UUID id;
    private String name;
    private Boolean accrualBonuses;
    private OffsetDateTime startsAt;
    private OffsetDateTime endsAt;
    private String conditionRule;
    private String conditionExactly;
    private Boolean activeMonday;
    private Boolean activeTuesday;
    private Boolean activeWednesday;
    private Boolean activeThursday;
    private Boolean activeFriday;
    private Boolean activeSaturday;
    private Boolean activeSunday;
    private String result;
    private Long bonusProductsCount;
    private String bonusProductsResult;
    private Double bonusProductsResultValue;
    private Double discountValue;
    private List<PromotionPeriodRequest> promotionPeriods;
    private List<PromotionConditionRequest> promotionConditions;
    private List<PromotionBonusRequest> promotionBonuses;
}
