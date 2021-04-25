package com.pk.cruncher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@IdClass(ItemInventory.ItemInventoryId.class)
public class ItemInventory {

    @Id
    @ManyToOne
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @Id
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private Double actualQuantity;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class ItemInventoryId implements Serializable {
        private Inventory inventory;
        private Item item;
    }
}
