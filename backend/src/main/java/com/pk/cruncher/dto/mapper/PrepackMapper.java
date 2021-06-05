package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.PrepackDTO;
import com.pk.cruncher.entity.Item;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class PrepackMapper implements BaseMapper<Item, PrepackDTO> {

    private final RecipeIngredientMapper recipeIngredientMapper;

    public PrepackMapper(RecipeIngredientMapper recipeIngredientMapper) {
        this.recipeIngredientMapper = recipeIngredientMapper;
    }

    @Override
    public PrepackDTO toDto(Item entity) {
        return PrepackDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .name(entity.getName())
            .code(entity.getCode())
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .productionDescription(entity.getProductionDescription())
            .cookTimeSeconds(entity.getCookTimeSeconds())
            .recipeIngredients(entity.getRecipeStructures().stream()
                .map(recipeIngredientMapper::toDto)
                .collect(Collectors.toList()))
            .build();
    }
}
