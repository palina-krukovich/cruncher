package com.pk.cruncher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class RecipeIngredient extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "structure_id")
    private Item structureItem;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Item ingredientItem;

    private Double grossQuantity;

    private Double netQuantity;

    private Boolean lock;

    private Boolean cleared;

    private Boolean boiled;

    private Boolean fried;

    private Boolean stewed;

    private Boolean baked;
}
