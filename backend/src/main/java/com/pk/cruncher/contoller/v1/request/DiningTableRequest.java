package com.pk.cruncher.contoller.v1.request;

import com.pk.cruncher.entity.type.Shape;
import lombok.Data;

import java.util.UUID;

@Data
public class DiningTableRequest {
    private UUID id;
    private String name;
    private Long capacity;
    private String shape;
    private Double x;
    private Double y;
    private Double width;
    private Double height;
}
