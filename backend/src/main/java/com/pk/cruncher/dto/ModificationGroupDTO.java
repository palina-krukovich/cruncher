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
public class ModificationGroupDTO {
    private UUID id;
    private String name;
    private String type;
    private Long minNum;
    private Long maxNum;
    private List<ModificationDTO> modifications;
}
