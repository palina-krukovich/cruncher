package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.PromotionConditionExactly;
import com.pk.cruncher.entity.type.PromotionConditionRule;
import com.pk.cruncher.entity.type.PromotionResult;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Promotion extends BaseEntity {

    private String name;

    private Boolean accrualBonuses;

    private OffsetDateTime startsAt;

    private OffsetDateTime endsAt;

    private PromotionConditionRule conditionRule;

    private PromotionConditionExactly conditionExactly;

    private Boolean activeMonday;

    private Boolean activeTuesday;

    private Boolean activeWednesday;

    private Boolean activeThursday;

    private Boolean activeFriday;

    private Boolean activeSaturday;

    private Boolean activeSunday;

    private PromotionResult result;

    private Long bonusProductsCount;

    private PromotionResult bonusProductsResult;

    private Double bonusProductsResultValue;

    private Double discountValue;

    @OneToMany(mappedBy = "promotion")
    private List<PromotionPeriod> promotionPeriods;

    @OneToMany(mappedBy = "promotion")
    private List<PromotionCondition> promotionConditions;

    @OneToMany(mappedBy = "promotion")
    private List<PromotionBonus> promotionBonuses;

}
