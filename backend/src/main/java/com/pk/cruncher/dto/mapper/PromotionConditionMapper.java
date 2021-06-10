package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.PromotionConditionDTO;
import com.pk.cruncher.entity.PromotionCondition;
import org.springframework.stereotype.Component;

@Component
public class PromotionConditionMapper implements BaseMapper<PromotionCondition, PromotionConditionDTO> {

    private final ItemMapper itemMapper;
    private final CategoryMapper categoryMapper;

    public PromotionConditionMapper(ItemMapper itemMapper, CategoryMapper categoryMapper) {
        this.itemMapper = itemMapper;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public PromotionConditionDTO toDto(PromotionCondition entity) {
        return PromotionConditionDTO.builder()
            .id(entity.getId())
            .item(entity.getItem() == null ? null : itemMapper.toDto(entity.getItem()))
            .quantity(entity.getQuantity())
            .sum(entity.getSum())
            .build();
    }
}
