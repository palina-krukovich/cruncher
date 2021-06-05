package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.WriteOffReasonDTO;
import com.pk.cruncher.entity.WriteOffReason;
import org.springframework.stereotype.Component;

@Component
public class WriteOffReasonMapper implements BaseMapper<WriteOffReason, WriteOffReasonDTO> {
    @Override
    public WriteOffReasonDTO toDto(WriteOffReason entity) {
        return WriteOffReasonDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .description(entity.getDescription())
            .build();
    }
}
