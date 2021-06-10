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
public class LoyaltyRuleDTO {
    private UUID id;
    private String loyaltyType;
    private Long value;
    private ClientGroupDTO clientGroup;
}
