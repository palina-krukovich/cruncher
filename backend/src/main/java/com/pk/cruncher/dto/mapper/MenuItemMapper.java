package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.MenuItemDTO;
import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.ModificationGroup;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MenuItemMapper implements BaseMapper<Item, MenuItemDTO> {

    private final WorkshopMapper workshopMapper;

    public MenuItemMapper(WorkshopMapper workshopMapper) {
        this.workshopMapper = workshopMapper;
    }

    @Override
    public MenuItemDTO toDto(Item entity) {
        return MenuItemDTO.builder()
            .id(entity.getId())
            .type(entity.getType().toString())
            .name(entity.getName())
            .categoryId(entity.getCategory() == null ? null : entity.getCategory().getId())
            .code(entity.getCode())
            .barcode(entity.getBarcode())
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .productionDescription(entity.getProductionDescription())
            .cookTimeSeconds(entity.getCookTimeSeconds())
            .workshop(entity.getWorkshop() == null ? null : workshopMapper.toDto(entity.getWorkshop()))
            .noDiscount(entity.getNoDiscount())
            .price(entity.getPrice())
            .modificationGroups(getModificationGroups(entity))
            .build();
    }

    private List<MenuItemDTO.MenuItemModificationGroupDTO> getModificationGroups(Item item) {
        return item.getModificationGroups() == null ? Collections.emptyList() : item.getModificationGroups().stream()
            .map(group -> {
                var groupDTO = new MenuItemDTO.MenuItemModificationGroupDTO();
                groupDTO.setId(group.getId());
                groupDTO.setType(group.getType().toString());
                groupDTO.setName(group.getName());
                groupDTO.setMinNum(group.getMinNum());
                groupDTO.setMaxNum(group.getMaxNum());
                groupDTO.setModifications(getModifications(group));
                return groupDTO;
            }).collect(Collectors.toList());
    }

    private List<MenuItemDTO.MenuItemModificationDTO> getModifications(ModificationGroup group) {
        return group.getModifications() == null ? Collections.emptyList() : group.getModifications().stream()
            .map(modification -> {
                var modificationDTO = new MenuItemDTO.MenuItemModificationDTO();
                modificationDTO.setId(modification.getId());
                modificationDTO.setName(modification.getName());
                modificationDTO.setPrice(modification.getPrice());
                return modificationDTO;
            }).collect(Collectors.toList());
    }
}
