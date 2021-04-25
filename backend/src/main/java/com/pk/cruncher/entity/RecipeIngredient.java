package com.pk.cruncher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@IdClass(RecipeIngredient.RecipeIngredientId.class)
public class RecipeIngredient {

    @Id
    @ManyToOne
    @JoinColumn(name = "structure_id")
    private PreparedItem structure;

    @Id
    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private IngredientItem ingredient;

    private Double grossQuantity;

    private Double netQuantity;

    private Boolean lock;

    private Boolean cleared;

    private Boolean boiled;

    private Boolean fried;

    private Boolean stewed;

    private Boolean baked;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecipeIngredientId implements Serializable {
        private PreparedItem structure;
        private IngredientItem ingredient;
    }
}
