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
public class SupplierDTO {
    private UUID id;
    private String name;
    private String address;
    private String phoneNumber;
    private String comment;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private Long suppliesAmount;
}
