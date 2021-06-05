package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.RecipeIngredientDTO;
import com.pk.cruncher.entity.RecipeIngredient;
import org.springframework.stereotype.Component;

@Component
public class RecipeIngredientMapper implements BaseMapper<RecipeIngredient, RecipeIngredientDTO> {
    private final IngredientMapper ingredientMapper;

    public RecipeIngredientMapper(IngredientMapper ingredientMapper) {
        this.ingredientMapper = ingredientMapper;
    }

    @Override
    public RecipeIngredientDTO toDto(RecipeIngredient entity) {
        return RecipeIngredientDTO.builder()
            .id(entity.getId())
            .ingredient(ingredientMapper.toDto(entity.getIngredientItem()))
            .grossQuantity(entity.getGrossQuantity())
            .netQuantity(entity.getNetQuantity())
            .lock(entity.getLock())
            .cleared(entity.getCleared())
            .boiled(entity.getBoiled())
            .fried(entity.getFried())
            .stewed(entity.getStewed())
            .baked(entity.getBaked())
            .build();
    }
}
