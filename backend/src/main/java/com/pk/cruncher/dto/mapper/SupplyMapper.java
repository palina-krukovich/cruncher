package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.SupplyDTO;
import com.pk.cruncher.entity.Supply;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class SupplyMapper implements BaseMapper<Supply, SupplyDTO> {

    private final ItemSupplyMapper itemSupplyMapper;

    public SupplyMapper(ItemSupplyMapper itemSupplyMapper) {
        this.itemSupplyMapper = itemSupplyMapper;
    }

    @Override
    public SupplyDTO toDto(Supply entity) {
        return SupplyDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .comment(entity.getComment())
            .suppliedAt(entity.getSuppliedAt())
            .supplierId(entity.getSupplier() == null ? null : entity.getSupplier().getId())
            .supplierName(entity.getSupplier() == null ? null : entity.getSupplier().getName())
            .itemSupplies(entity.getItemSupplies() == null ? null : entity.getItemSupplies().stream()
                .map(itemSupplyMapper::toDto).collect(Collectors.toList()))
            .build();
    }
}
