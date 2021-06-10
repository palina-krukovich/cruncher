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
public class OrderDTO {
    private UUID id;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private Long receiptNumber;
    private UUID tableId;
    private String tableName;
    private EmployeeDTO employee;
    private ClientDTO client;
    private String status;
    private String type;
    private Long subtotal;
    private Double discountRate;
    private Long discountAmount;
    private Long totalPrice;
    private Long payedCash;
    private Long payedCard;
    private Long payedCashBack;
    private Long payedTotal;
    private OffsetDateTime openedAt;
    private OffsetDateTime closedAt;
    private List<OrderItemDTO> items;
}
