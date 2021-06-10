package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class LoyaltyRuleRequest {
    private UUID id;
    private String loyaltyType;
    private UUID clientGroupId;
    private Long value;
}
