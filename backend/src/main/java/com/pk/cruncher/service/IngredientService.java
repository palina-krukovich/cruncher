package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.IngredientRequest;
import com.pk.cruncher.dto.IngredientDTO;
import com.pk.cruncher.dto.mapper.IngredientMapper;
import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.entity.type.Unit;
import com.pk.cruncher.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class IngredientService {
    private final ItemRepository itemRepository;
    private final IngredientMapper ingredientMapper;

    public IngredientService(ItemRepository itemRepository, IngredientMapper ingredientMapper) {
        this.itemRepository = itemRepository;
        this.ingredientMapper = ingredientMapper;
    }

    public List<IngredientDTO> getAll() {
        return itemRepository.findAllByDeletedIsFalseAndType(ItemType.INGREDIENT)
            .stream().map(ingredientMapper::toDto).collect(Collectors.toList());
    }

    public List<IngredientDTO> getDeleted() {
        return itemRepository.findAllByDeletedIsTrueAndType(ItemType.INGREDIENT)
            .stream().map(ingredientMapper::toDto).collect(Collectors.toList());
    }

    public IngredientDTO getById(UUID id) {
        return itemRepository.findByIdAndType(id, ItemType.INGREDIENT)
            .map(ingredientMapper::toDto).orElseThrow();
    }

    public List<IngredientDTO> getAllIngredientsForRecipe() {
        return itemRepository.findAllByDeletedIsFalseAndTypeIn(List.of(ItemType.INGREDIENT, ItemType.PREPACK))
            .stream().map(ingredientMapper::toDto).collect(Collectors.toList());
    }

    public Item getIngredientForRecipeById(UUID id) {
        return itemRepository.findByIdAndTypeIn(id, List.of(ItemType.INGREDIENT, ItemType.PREPACK)).orElse(null);
    }

    public IngredientDTO create(IngredientRequest request) {
        Item item = new Item();
        fromRequest(item, request);
        item.setType(ItemType.INGREDIENT);
        item.setDeleted(false);
        item.setCreatedAt(OffsetDateTime.now());
        item.setUpdatedAt(OffsetDateTime.now());
        return ingredientMapper.toDto(itemRepository.save(item));
    }

    public IngredientDTO update(IngredientRequest request) {
        Item item = itemRepository.findByIdAndType(request.getId(), ItemType.INGREDIENT).orElseThrow();
        fromRequest(item, request);
        item.setUpdatedAt(OffsetDateTime.now());
        return ingredientMapper.toDto(itemRepository.save(item));
    }

    public IngredientDTO delete(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.INGREDIENT).orElseThrow();
        item.setDeleted(true);
        item.setUpdatedAt(OffsetDateTime.now());
        return ingredientMapper.toDto(itemRepository.save(item));
    }

    public IngredientDTO recover(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.INGREDIENT).orElseThrow();
        item.setDeleted(false);
        item.setUpdatedAt(OffsetDateTime.now());
        return ingredientMapper.toDto(itemRepository.save(item));
    }

    private void fromRequest(Item item, IngredientRequest request) {
        item.setCode(request.getCode());
        item.setBarcode(request.getBarcode());
        item.setName(request.getName());
        item.setUnit(Unit.valueOf(request.getUnit()));
        item.setWeightPerPiece(request.getWeightPerPiece());
        item.setRoundInventory(request.getRoundInventory());
        item.setColor(request.getColor());
        item.setPhotoURL(request.getPhotoURL());
        item.setLossClear(request.getLossClear());
        item.setLossBoil(request.getLossBoil());
        item.setLossFry(request.getLossFry());
        item.setLossBake(request.getLossBake());
        item.setLossStew(request.getLossStew());
    }
}
