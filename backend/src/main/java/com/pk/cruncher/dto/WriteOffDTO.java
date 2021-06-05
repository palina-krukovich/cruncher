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
public class WriteOffDTO {
    private UUID id;
    private ItemDTO item;
    private OffsetDateTime writtenOffAt;
    private Double quantity;
    private Boolean auto;
    private WriteOffReasonDTO writeOffReason;

}
