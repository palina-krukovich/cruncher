package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class SupplyRequest {
    private UUID id;
    private UUID supplierId;
    private OffsetDateTime suppliedAt;
    private String comment;
    private List<ItemSupplyRequest> itemSupplies;
}
