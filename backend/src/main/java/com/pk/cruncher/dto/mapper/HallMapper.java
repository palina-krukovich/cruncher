package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.HallDTO;
import com.pk.cruncher.entity.Hall;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class HallMapper implements BaseMapper<Hall, HallDTO> {
    private final DiningTableMapper diningTableMapper;

    public HallMapper(DiningTableMapper diningTableMapper) {
        this.diningTableMapper = diningTableMapper;
    }

    @Override
    public HallDTO toDto(Hall entity) {
        return HallDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .tables(entity.getDiningTables().stream()
                .filter(table -> !table.getDeleted())
                .map(diningTableMapper::toDto).collect(Collectors.toList()))
            .build();
    }
}
