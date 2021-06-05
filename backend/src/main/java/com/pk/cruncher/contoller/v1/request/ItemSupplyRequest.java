package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ItemSupplyRequest {
    private UUID itemId;
    private UUID packId;
    private Double quantity;
    private Long pricePerUnit;
}
