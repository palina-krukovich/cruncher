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
public class InventoryDTO {
    private UUID id;
    private OffsetDateTime checkedAt;
    private ItemDTO item;
    private OffsetDateTime lastInventoryCheckDate;
    private Double initialQuantity;
    private Long initialValue;
    private Double supplyQuantity;
    private Long supplyValue;
    private Double salesQuantity;
    private Long salesValue;
    private Double wasteQuantity;
    private Long wasteValue;
    private Double expectedQuantity;
    private Long expectedValue;
    private Double actualQuantity;
    private Long actualValue;
    private Double differenceQuantity;
    private Long differenceValue;
}
