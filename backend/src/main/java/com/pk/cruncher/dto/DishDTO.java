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
public class DishDTO {
    private UUID id;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private String name;
    private String code;
    private String barcode;
    private String color;
    private String photoURL;
    private UUID categoryId;
    private String categoryName;
    private UUID workshopId;
    private String workshopName;
    private Boolean noDiscount;
    private Long price;
    private String productionDescription;
    private Long cookTimeSeconds;
    private List<RecipeIngredientDTO> recipeIngredients;
    private List<ModificationGroupDTO> modificationGroups;
}
