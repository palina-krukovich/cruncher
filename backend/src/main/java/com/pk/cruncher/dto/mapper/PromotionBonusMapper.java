package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.PromotionBonusDTO;
import com.pk.cruncher.entity.PromotionBonus;
import org.springframework.stereotype.Component;

@Component
public class PromotionBonusMapper implements BaseMapper<PromotionBonus, PromotionBonusDTO> {

    private final ItemMapper itemMapper;
    private final CategoryMapper categoryMapper;

    public PromotionBonusMapper(ItemMapper itemMapper, CategoryMapper categoryMapper) {
        this.itemMapper = itemMapper;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public PromotionBonusDTO toDto(PromotionBonus entity) {
        return PromotionBonusDTO.builder()
            .id(entity.getId())
            .item(entity.getItem() == null ? null : itemMapper.toDto(entity.getItem()))
            .fixedPrice(entity.getFixedPrice())
            .build();
    }
}
