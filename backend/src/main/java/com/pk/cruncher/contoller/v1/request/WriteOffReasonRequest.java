package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class WriteOffReasonRequest {
    private UUID id;
    private String name;
    private String description;
}
