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
public class ItemSupplyDTO {
    private UUID itemId;
    private String itemName;
    private String itemType;
    private String itemUnit;
    private UUID supplyId;
    private UUID packId;
    private String packName;
    private Double quantity;
    private Long pricePerUnit;
}
