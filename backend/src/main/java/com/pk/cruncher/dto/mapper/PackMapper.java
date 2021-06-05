package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.PackDTO;
import com.pk.cruncher.entity.Pack;
import org.springframework.stereotype.Component;

@Component
public class PackMapper implements BaseMapper<Pack, PackDTO> {
    @Override
    public PackDTO toDto(Pack entity) {
        return PackDTO.builder()
            .id(entity.getId().toString())
            .name(entity.getName())
            .unit(entity.getUnit().toString())
            .unitQuantity(entity.getUnitQuantity())
            .build();
    }
}
