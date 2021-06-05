package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.ItemSupplyDTO;
import com.pk.cruncher.entity.ItemSupply;
import org.springframework.stereotype.Component;

@Component
public class ItemSupplyMapper implements BaseMapper<ItemSupply, ItemSupplyDTO> {
    @Override
    public ItemSupplyDTO toDto(ItemSupply entity) {
        return ItemSupplyDTO.builder()
            .itemId(entity.getItem().getId())
            .itemName(entity.getItem().getName())
            .itemType(entity.getItem().getType().toString())
            .itemUnit(entity.getItem().getUnit() == null ? null : entity.getItem().getUnit().toString())
            .supplyId(entity.getSupply().getId())
            .packId(entity.getPack() == null ? null : entity.getPack().getId())
            .packName(entity.getPack() == null ? null : entity.getPack().getName())
            .quantity(entity.getQuantity())
            .pricePerUnit(entity.getPricePerUnit())
            .build();
    }
}
