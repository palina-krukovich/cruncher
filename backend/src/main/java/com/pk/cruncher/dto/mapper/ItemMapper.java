package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.ItemDTO;
import com.pk.cruncher.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper implements BaseMapper<Item, ItemDTO> {
    @Override
    public ItemDTO toDto(Item entity) {
        return ItemDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .itemType(entity.getType().toString())
            .unit(entity.getUnit() == null ? null : entity.getUnit().toString())
            .build();
    }
}
