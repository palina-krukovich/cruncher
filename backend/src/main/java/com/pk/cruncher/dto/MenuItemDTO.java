package com.pk.cruncher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemDTO {
    private UUID id;
    private String type;
    private String name;
    private UUID categoryId;
    private String code;
    private String barcode;
    private String color;
    private String photoURL;
    private String productionDescription;
    private Long cookTimeSeconds;
    private WorkshopDTO workshop;
    private Boolean noDiscount;
    private Long price;
    private List<MenuItemModificationGroupDTO> modificationGroups;

    @Data
    public static class MenuItemModificationGroupDTO {
        private UUID id;
        private String name;
        private String type;
        private Long minNum;
        private Long maxNum;
        private List<MenuItemModificationDTO> modifications;
    }

    @Data
    public static class MenuItemModificationDTO {
        private UUID id;
        private String name;
        private Long price;
    }
}
