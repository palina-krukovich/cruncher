package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ModificationRequest {
    private UUID id;
    private String name;
    private UUID ingredientId;
    private Boolean withoutWriteOff;
    private Double quantity;
    private Long price;
}
