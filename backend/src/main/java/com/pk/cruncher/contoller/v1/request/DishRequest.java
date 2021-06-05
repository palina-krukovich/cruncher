package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class DishRequest {
    private UUID id;
    private String name;
    private String code;
    private String barcode;
    private String color;
    private String photoURL;
    private UUID categoryId;
    private UUID workshopId;
    private Boolean noDiscount;
    private Long price;
    private String productionDescription;
    private Long cookTimeSeconds;
    private List<RecipeIngredientRequest> recipeIngredients;
    private List<ModificationGroupRequest> modificationGroups;
}
