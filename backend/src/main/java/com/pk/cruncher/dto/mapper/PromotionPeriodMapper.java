package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.PromotionPeriodDTO;
import com.pk.cruncher.entity.PromotionPeriod;
import org.springframework.stereotype.Component;

@Component
public class PromotionPeriodMapper implements BaseMapper<PromotionPeriod, PromotionPeriodDTO> {
    @Override
    public PromotionPeriodDTO toDto(PromotionPeriod entity) {
        return PromotionPeriodDTO.builder()
            .id(entity.getId())
            .startHours(entity.getStartHours())
            .startMinutes(entity.getStartMinutes())
            .endHours(entity.getEndHours())
            .endMinutes(entity.getEndMinutes())
            .build();
    }
}
