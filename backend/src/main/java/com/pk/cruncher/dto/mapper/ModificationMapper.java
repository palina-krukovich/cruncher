package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.ModificationDTO;
import com.pk.cruncher.entity.Modification;
import org.springframework.stereotype.Component;

@Component
public class ModificationMapper implements BaseMapper<Modification, ModificationDTO> {
    private final IngredientMapper ingredientMapper;

    public ModificationMapper(IngredientMapper ingredientMapper) {
        this.ingredientMapper = ingredientMapper;
    }

    @Override
    public ModificationDTO toDto(Modification entity) {
        return ModificationDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .ingredient(entity.getModificationItem() == null ? null : ingredientMapper.toDto(entity.getModificationItem()))
            .withoutWriteOff(entity.getWithoutWriteOff())
            .quantity(entity.getQuantity())
            .price(entity.getPrice())
            .build();
    }
}
