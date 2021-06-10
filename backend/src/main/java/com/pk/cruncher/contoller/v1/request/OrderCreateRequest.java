package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class OrderCreateRequest {
    private UUID tableId;
    private String type;
}
