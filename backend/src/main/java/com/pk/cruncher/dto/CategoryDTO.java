package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {
    private UUID id;
    private String name;
    private UUID parentCategoryId;
    private List<CategoryDTO> subCategories;
    private String color;
    private String photoURL;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
