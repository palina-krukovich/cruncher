package com.pk.cruncher.dto;

import com.pk.cruncher.entity.type.ItemType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredientDTO {
    private UUID id;
    private String type;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private String code;
    private String name;
    private String barcode;
    private String unit;
    private Double weightPerPiece;
    private Boolean roundInventory;
    private String color;
    private String photoURL;
    private Double lossClear;
    private Double lossBoil;
    private Double lossFry;
    private Double lossStew;
    private Double lossBake;
    private Long cost;
}
