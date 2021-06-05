package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.CategoryDTO;
import com.pk.cruncher.entity.Category;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class CategoryMapper implements BaseMapper<Category, CategoryDTO> {
    @Override
    public CategoryDTO toDto(Category entity) {
        return CategoryDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .parentCategoryId(entity.getParentCategory() == null ? null : entity.getParentCategory().getId())
            .subCategories(entity.getSubCategories() == null ? Collections.emptyList() : entity.getSubCategories().stream().map(this::toDto).collect(Collectors.toList()))
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
}
