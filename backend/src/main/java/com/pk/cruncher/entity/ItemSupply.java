package com.pk.cruncher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@IdClass(ItemSupply.ItemSupplyId.class)
public class ItemSupply {

    @Id
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Id
    @ManyToOne
    @JoinColumn(name = "supply_id")
    private Supply supply;

    @ManyToOne
    @JoinColumn(name = "pack_id")
    private Pack pack;

    private Double quantity;

    private Long pricePerUnit;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class ItemSupplyId implements Serializable {
        private Item item;
        private Supply supply;
    }
}
