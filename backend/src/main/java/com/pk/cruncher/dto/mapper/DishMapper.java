package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.DishDTO;
import com.pk.cruncher.entity.Item;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class DishMapper implements BaseMapper<Item, DishDTO> {
    private final RecipeIngredientMapper recipeIngredientMapper;
    private final ModificationGroupMapper modificationGroupMapper;

    public DishMapper(RecipeIngredientMapper recipeIngredientMapper, ModificationGroupMapper modificationGroupMapper) {
        this.recipeIngredientMapper = recipeIngredientMapper;
        this.modificationGroupMapper = modificationGroupMapper;
    }

    @Override
    public DishDTO toDto(Item entity) {
        return DishDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .name(entity.getName())
            .code(entity.getCode())
            .barcode(entity.getBarcode())
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .categoryId(entity.getCategory() == null ? null : entity.getCategory().getId())
            .categoryName(entity.getCategory() == null ? null : entity.getCategory().getName())
            .workshopId(entity.getWorkshop() == null ? null : entity.getWorkshop().getId())
            .workshopName(entity.getWorkshop() == null ? null : entity.getWorkshop().getName())
            .noDiscount(entity.getNoDiscount())
            .price(entity.getPrice())
            .productionDescription(entity.getProductionDescription())
            .cookTimeSeconds(entity.getCookTimeSeconds())
            .recipeIngredients(entity.getRecipeStructures().stream()
                .map(recipeIngredientMapper::toDto)
                .collect(Collectors.toList()))
            .modificationGroups(entity.getModificationGroups().stream()
                .map(modificationGroupMapper::toDto)
                .collect(Collectors.toList()))
            .build();
    }
}
