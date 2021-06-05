package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockDTO {
    private String itemName;
    private String itemType;
    private String itemUnit;
    private String color;
    private String photoURL;
    private String categoryName;
    private Double quantity;
    private Long value;
    private Long sum;

}
