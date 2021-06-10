package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.PositionDTO;
import com.pk.cruncher.entity.Position;
import org.springframework.stereotype.Component;

@Component
public class PositionMapper implements BaseMapper<Position, PositionDTO> {
    @Override
    public PositionDTO toDto(Position entity) {
        return PositionDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .title(entity.getTitle())
            .description(entity.getDescription())
            .build();
    }
}
