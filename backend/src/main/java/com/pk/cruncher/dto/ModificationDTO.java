package com.pk.cruncher.dto;

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
public class ModificationDTO {
    private UUID id;
    private String name;
    private IngredientDTO ingredient;
    private Boolean withoutWriteOff;
    private Double quantity;
    private Long price;
}
