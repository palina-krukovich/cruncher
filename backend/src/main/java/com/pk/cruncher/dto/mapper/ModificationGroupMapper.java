package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.ModificationGroupDTO;
import com.pk.cruncher.entity.ModificationGroup;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ModificationGroupMapper implements BaseMapper<ModificationGroup, ModificationGroupDTO> {
    private final ModificationMapper modificationMapper;

    public ModificationGroupMapper(ModificationMapper modificationMapper) {
        this.modificationMapper = modificationMapper;
    }

    @Override
    public ModificationGroupDTO toDto(ModificationGroup entity) {
        return ModificationGroupDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .type(entity.getType().toString())
            .minNum(entity.getMinNum())
            .maxNum(entity.getMaxNum())
            .modifications(entity.getModifications() == null ? null
                : entity.getModifications().stream().map(modificationMapper::toDto).collect(Collectors.toList()))
            .build();
    }
}
