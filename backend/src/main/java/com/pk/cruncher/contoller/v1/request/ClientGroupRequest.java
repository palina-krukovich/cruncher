package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ClientGroupRequest {
    private UUID id;
    private String name;
    private String loyaltyType;
    private Double discountRate;
}
