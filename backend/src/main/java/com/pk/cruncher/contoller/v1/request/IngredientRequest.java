package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class IngredientRequest {
    private UUID id;
    private String code;
    private String barcode;
    @NotNull
    private String name;
    @NotNull
    private String unit;
    private Double weightPerPiece;
    private Boolean roundInventory;
    private String color;
    private String photoURL;
    @Min(0) @Max(100)
    private Double lossClear;
    @Min(0) @Max(100)
    private Double lossBoil;
    @Min(0) @Max(100)
    private Double lossFry;
    @Min(0) @Max(100)
    private Double lossStew;
    @Min(0) @Max(100)
    private Double lossBake;
}
