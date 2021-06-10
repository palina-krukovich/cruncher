package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {
    private UUID id;
    private UUID itemId;
    private String itemName;
    private Long itemPrice;
    private List<String> modificationNames;
    private List<String> promotionNames;
    private Long quantity;
    private Long pricePerItem;
    private Long subtotal;
    private Double discountRate;
    private Long discountAmount;
    private Long totalPrice;
    private String status;
}
