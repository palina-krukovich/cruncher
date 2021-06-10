package com.pk.cruncher.contoller.v1.request;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class OrderItemRequest {
    private UUID id;
    private UUID orderId;
    private UUID itemId;
    private List<UUID> modificationIds;
    private Long quantity;
}
