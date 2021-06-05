package com.pk.cruncher.contoller.v1.request;

import com.pk.cruncher.dto.IngredientDTO;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class RecipeIngredientRequest {
    private UUID id;
    @NotNull
    private IngredientDTO ingredient;
    @Min(0)
    private Double grossQuantity;
    @Min(0)
    private Double netQuantity;
    private Boolean lock;
    private Boolean cleared;
    private Boolean boiled;
    private Boolean fried;
    private Boolean stewed;
    private Boolean baked;
}
