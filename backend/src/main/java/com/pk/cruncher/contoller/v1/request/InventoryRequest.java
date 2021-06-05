package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class InventoryRequest {
    private UUID id;
    private OffsetDateTime checkedAt;
    private UUID itemId;
    private Double actualQuantity;
}
