package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class PromotionBonusRequest {
    private UUID id;
    private UUID itemId;
    private Long fixedPrice;
}
