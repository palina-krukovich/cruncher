package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionPeriodDTO {
    private UUID id;
    private Long startHours;
    private Long startMinutes;
    private Long endHours;
    private Long endMinutes;
}
