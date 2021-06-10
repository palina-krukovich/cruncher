package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class PromotionConditionRequest {
    private UUID id;
    private UUID itemId;
    private Long quantity;
    private Long sum;
}
