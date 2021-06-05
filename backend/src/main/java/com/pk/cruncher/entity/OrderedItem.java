package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.OrderedItemStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class OrderedItem extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToMany
    @JoinTable (
        name = "ordered_item_modification",
        joinColumns = @JoinColumn(name = "ordered_item_id"),
        inverseJoinColumns = @JoinColumn(name = "modification_id")
    )
    private List<Modification> modifications;

    private Long quantity;

    private Long pricePerItem;

    private Long subtotal;

    private Double discountRate;

    private Long discountAmount;

    private Long totalPrice;

    private OrderedItemStatus status;
}
