package com.pk.cruncher.dto.mapper;

public interface BaseMapper<EntityType, DtoType> {
    DtoType toDto(EntityType entity);
}
