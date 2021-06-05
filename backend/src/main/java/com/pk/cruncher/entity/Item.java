package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.entity.type.Unit;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class Item extends BaseEntity {

    @Column(nullable = false)
    private ItemType type;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String code;

    @Column(unique = true)
    private String barcode;

    private Unit unit;

    private Double weightPerPiece;

    private Boolean roundInventory;

    private String color;

    @Column(length = 2048)
    private String photoURL;

    @Column(columnDefinition = "boolean default false")
    private Boolean deleted;

    private Double lossClear;

    private Double lossBoil;

    private Double lossFry;

    private Double lossStew;

    private Double lossBake;

    @Column(length = 4096)
    private String productionDescription;

    private Long cookTimeSeconds;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "workshop_id")
    private Workshop workshop;

    private Boolean noDiscount;

    private Long cost;

    private Long price;

    @OneToMany(mappedBy = "modificationItem")
    private List<Modification> modifications;

    @OneToMany(mappedBy = "item")
    private List<WriteOff> writeOffs;

    @OneToMany(mappedBy = "item")
    private List<Inventory> inventories;

    @OneToMany(mappedBy = "item")
    private List<ItemSupply> itemSupplies;

    @OneToMany(mappedBy = "ingredientItem")
    private List<RecipeIngredient> recipeIngredients;

    @OneToMany(mappedBy = "structureItem")
    private List<RecipeIngredient> recipeStructures;

    @OneToMany(mappedBy = "item")
    private List<ModificationGroup> modificationGroups;

    @OneToMany(mappedBy = "item")
    private List<OrderedItem> orderedItems;

    @OneToMany(mappedBy = "item")
    private List<PromotionCondition> promotionConditions;

    @OneToMany(mappedBy = "item")
    private List<PromotionBonus> promotionBonuses;
}
