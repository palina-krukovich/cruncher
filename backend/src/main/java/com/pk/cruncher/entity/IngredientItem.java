package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class IngredientItem extends Item {

    private Double lossClear;

    private Double lossBoil;

    private Double lossFry;

    private Double lossStew;

    private Double lossBake;

    @OneToMany(mappedBy = "ingredient")
    private List<RecipeIngredient> recipeIngredients;
}
