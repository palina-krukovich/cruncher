package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.RecipeIngredientRequest;
import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.RecipeIngredient;
import com.pk.cruncher.repository.ItemRepository;
import com.pk.cruncher.repository.RecipeIngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeIngredientService {
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final ItemRepository itemRepository;

    public RecipeIngredientService(RecipeIngredientRepository recipeIngredientRepository,
                                   ItemRepository itemRepository) {
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.itemRepository = itemRepository;
    }

    public void create(Item structure, RecipeIngredientRequest request) {
        RecipeIngredient recipeIngredient = new RecipeIngredient();
        fromRequest(recipeIngredient, request);
        recipeIngredient.setStructureItem(structure);
        recipeIngredientRepository.save(recipeIngredient);
    }

    public void delete(Item structure) {
        List<RecipeIngredient> recipeIngredients = recipeIngredientRepository.findAllByStructureItem(structure);
        recipeIngredientRepository.deleteAll(recipeIngredients);
    }

    private void fromRequest(RecipeIngredient recipeIngredient, RecipeIngredientRequest request) {
        recipeIngredient.setIngredientItem(itemRepository.findById(request.getIngredient().getId()).orElseThrow());
        recipeIngredient.setGrossQuantity(request.getGrossQuantity());
        recipeIngredient.setNetQuantity(request.getNetQuantity());
        recipeIngredient.setLock(request.getLock());
        recipeIngredient.setCleared(request.getCleared());
        recipeIngredient.setFried(request.getFried());
        recipeIngredient.setBoiled(request.getBoiled());
        recipeIngredient.setStewed(request.getStewed());
        recipeIngredient.setBaked(request.getBaked());
    }
}
