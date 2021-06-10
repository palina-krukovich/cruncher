package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.PromotionDTO;
import com.pk.cruncher.entity.Promotion;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PromotionMapper implements BaseMapper<Promotion, PromotionDTO> {

    private final PromotionPeriodMapper promotionPeriodMapper;
    private final PromotionConditionMapper promotionConditionMapper;
    private final PromotionBonusMapper promotionBonusMapper;

    public PromotionMapper(PromotionPeriodMapper promotionPeriodMapper, PromotionConditionMapper promotionConditionMapper, PromotionBonusMapper promotionBonusMapper) {
        this.promotionPeriodMapper = promotionPeriodMapper;
        this.promotionConditionMapper = promotionConditionMapper;
        this.promotionBonusMapper = promotionBonusMapper;
    }

    @Override
    public PromotionDTO toDto(Promotion entity) {
        return PromotionDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .accrualBonuses(entity.getAccrualBonuses())
            .startsAt(entity.getStartsAt())
            .endsAt(entity.getEndsAt())
            .conditionRule(entity.getConditionRule() == null ? null : entity.getConditionRule().toString())
            .conditionExactly(entity.getConditionExactly() == null ? null : entity.getConditionExactly().toString())
            .activeMonday(entity.getActiveMonday())
            .activeTuesday(entity.getActiveTuesday())
            .activeWednesday(entity.getActiveWednesday())
            .activeThursday(entity.getActiveThursday())
            .activeFriday(entity.getActiveFriday())
            .activeSaturday(entity.getActiveSaturday())
            .activeSunday(entity.getActiveSunday())
            .result(entity.getResult() == null ? null : entity.getResult().toString())
            .bonusProductsCount(entity.getBonusProductsCount())
            .bonusProductsResult(entity.getBonusProductsResult() == null ? null : entity.getBonusProductsResult().toString())
            .bonusProductsResultValue(entity.getBonusProductsResultValue())
            .discountValue(entity.getDiscountValue())
            .promotionPeriods(entity.getPromotionPeriods() == null ? null : entity.getPromotionPeriods()
                .stream().map(promotionPeriodMapper::toDto).collect(Collectors.toList()))
            .promotionConditions(entity.getPromotionConditions() == null ? null : entity.getPromotionConditions()
                .stream().map(promotionConditionMapper::toDto).collect(Collectors.toList()))
            .promotionBonuses(entity.getPromotionBonuses() == null ? null : entity.getPromotionBonuses()
                .stream().map(promotionBonusMapper::toDto).collect(Collectors.toList()))
            .build();
    }
}
