package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class Inventory extends BaseEntity {

    private OffsetDateTime checkedAt;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private Double actualQuantity;
}
