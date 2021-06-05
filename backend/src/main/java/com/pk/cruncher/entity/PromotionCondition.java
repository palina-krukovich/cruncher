package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.ItemType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class PromotionCondition extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    private ItemType type;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Long quantity;

    private Long sum;
}
