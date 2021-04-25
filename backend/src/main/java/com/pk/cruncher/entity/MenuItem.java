package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.ItemType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class MenuItem extends Item {

    private ItemType type;

    @ManyToOne
    @JoinColumn(name = "menu_category_id")
    private MenuCategory menuCategory;

    @ManyToOne
    @JoinColumn(name = "workshop_id")
    private Workshop workshop;

    private Boolean noDiscount;

    private Long cost;

    private Long price;

    @ManyToMany(mappedBy = "menuItems")
    private List<ModificationGroup> modificationGroups;

    @OneToMany(mappedBy = "menuItem")
    private List<OrderedItem> orderedItems;

    @OneToMany(mappedBy = "menuItem")
    private List<PromotionCondition> promotionConditions;

    @OneToMany(mappedBy = "menuItem")
    private List<PromotionBonus> promotionBonuses;
}
