package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, UUID> {
    List<RecipeIngredient> findAllByStructureItem(Item structureItem);
}
