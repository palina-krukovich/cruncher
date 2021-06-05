package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class CategoryRequest {
    private UUID id;
    @NotNull
    private String name;
    private UUID parentCategoryId;
    private String color;
    private String photoURL;
}
