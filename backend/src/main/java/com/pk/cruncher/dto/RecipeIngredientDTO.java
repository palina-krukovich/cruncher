package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredientDTO {
    private UUID id;
    private IngredientDTO ingredient;
    private Double grossQuantity;
    private Double netQuantity;
    private Boolean lock;
    private Boolean cleared;
    private Boolean boiled;
    private Boolean fried;
    private Boolean stewed;
    private Boolean baked;
}
