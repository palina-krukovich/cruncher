package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.MenuCategoryDTO;
import com.pk.cruncher.dto.MenuItemDTO;
import com.pk.cruncher.entity.Category;
import com.pk.cruncher.entity.Item;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class MenuCategoryMapper implements BaseMapper<Category, MenuCategoryDTO> {

    private final MenuItemMapper menuItemMapper;

    public MenuCategoryMapper(MenuItemMapper menuItemMapper) {
        this.menuItemMapper = menuItemMapper;
    }

    @Override
    public MenuCategoryDTO toDto(Category entity) {
        return MenuCategoryDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .parentCategoryId(entity.getParentCategory() == null ? null : entity.getParentCategory().getId())
            .subCategories(entity.getSubCategories() == null ? null : entity.getSubCategories().stream().map(this::toDto).collect(Collectors.toList()))
            .menuItems(entity.getItems() == null ? null : entity.getItems().stream()
                .filter(item -> !item.getDeleted()).map(menuItemMapper::toDto).collect(Collectors.toList()))
            .build();
    }
}
