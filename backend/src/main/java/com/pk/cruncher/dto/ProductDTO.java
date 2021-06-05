package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private UUID id;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private String name;
    private String code;
    private String barcode;
    private String color;
    private String photoURL;
    private UUID categoryId;
    private String categoryName;
    private UUID workshopId;
    private String workshopName;
    private boolean noDiscount;
    private Long cost;
    private Long price;
}
