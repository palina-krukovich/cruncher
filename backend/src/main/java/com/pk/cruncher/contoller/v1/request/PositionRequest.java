package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class PositionRequest {
    private UUID id;
    private String title;
    private String description;
}
