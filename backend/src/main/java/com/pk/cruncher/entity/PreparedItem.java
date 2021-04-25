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
public class PreparedItem extends Item {

    private String productionDescription;

    private Long cookTimeSeconds;

    @OneToMany(mappedBy = "preparedItem")
    private List<Manufacture> manufactures;

    @OneToMany(mappedBy = "structure")
    private List<RecipeIngredient> recipeIngredients;
}
