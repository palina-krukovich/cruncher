package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.WorkshopDTO;
import com.pk.cruncher.entity.Workshop;
import org.springframework.stereotype.Component;

@Component
public class WorkshopMapper implements BaseMapper<Workshop, WorkshopDTO> {
    @Override
    public WorkshopDTO toDto(Workshop entity) {
        return WorkshopDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
}
