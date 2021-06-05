package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.ProductDTO;
import com.pk.cruncher.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper implements BaseMapper<Item, ProductDTO> {
    @Override
    public ProductDTO toDto(Item entity) {
        return ProductDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .name(entity.getName())
            .code(entity.getCode())
            .barcode(entity.getBarcode())
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .categoryId(entity.getCategory() == null ? null : entity.getCategory().getId())
            .categoryName(entity.getCategory() == null ? null : entity.getCategory().getName())
            .workshopId(entity.getWorkshop() == null ? null : entity.getWorkshop().getId())
            .workshopName(entity.getWorkshop() == null ? null : entity.getWorkshop().getName())
            .noDiscount(entity.getNoDiscount())
            .cost(entity.getCost())
            .price(entity.getPrice())
            .build();
    }
}
