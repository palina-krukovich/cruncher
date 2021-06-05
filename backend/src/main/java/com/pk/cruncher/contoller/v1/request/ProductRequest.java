package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class ProductRequest {
    private UUID id;
    @NotNull
    private String name;
    private String code;
    private String barcode;
    private String color;
    private String photoURL;
    private UUID categoryId;
    private UUID workshopId;
    private Boolean noDiscount;
    @Min(0)
    private Long cost;
    @Min(0)
    private Long price;
}
