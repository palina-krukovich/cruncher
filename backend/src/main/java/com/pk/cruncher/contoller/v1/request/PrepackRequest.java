package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Data
public class PrepackRequest {
    private UUID id;
    private String color;
    private String photoURL;
    @NotNull
    private String name;
    private String code;
    private String productionDescription;
    @Min(0)
    private Long cookTimeSeconds;
    private List<RecipeIngredientRequest> recipeIngredients;
}
