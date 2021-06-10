package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiningTableDTO {
    private UUID id;
    private String name;
    private Long capacity;
    private String shape;
    private Double x;
    private Double y;
    private Double width;
    private Double height;
    private Boolean hasActiveOrders;
    private List<TableOrder> orders;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TableOrder {
        private UUID orderId;
        private Long receiptNumber;
    }
}
