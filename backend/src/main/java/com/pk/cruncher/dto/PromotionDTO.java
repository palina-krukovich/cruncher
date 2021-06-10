package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionDTO {

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
    private List<PromotionPeriodDTO> promotionPeriods;
    private List<PromotionConditionDTO> promotionConditions;
    private List<PromotionBonusDTO> promotionBonuses;
}
