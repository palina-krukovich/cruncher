package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class WriteOffRequest {
    private UUID id;
    private UUID itemId;
    private OffsetDateTime writtenOffAt;
    private Double quantity;
    private Boolean auto;
    private UUID writeOffReasonId;
}
