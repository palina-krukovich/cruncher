package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class MenuCategory extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private MenuCategory parentCategory;

    @OneToMany(mappedBy = "parentCategory")
    private List<MenuCategory> subCategories;

    private String color;

    private String photoURL;

    private Boolean deleted;

    @OneToMany(mappedBy = "menuCategory")
    private List<MenuItem> menuItems;

    @OneToMany(mappedBy = "menuCategory")
    private List<PromotionCondition> promotionConditions;

    @OneToMany(mappedBy = "menuCategory")
    private List<PromotionBonus> promotionBonuses;
}
