package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.DishRequest;
import com.pk.cruncher.dto.DishDTO;
import com.pk.cruncher.dto.mapper.DishMapper;
import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.repository.CategoryRepository;
import com.pk.cruncher.repository.ItemRepository;
import com.pk.cruncher.repository.WorkshopRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DishService {
    private final ItemRepository itemRepository;
    private final DishMapper dishMapper;
    private final RecipeIngredientService recipeIngredientService;
    private final CategoryRepository categoryRepository;
    private final WorkshopRepository workshopRepository;
    private final ModificationService modificationService;

    public DishService(ItemRepository itemRepository, RecipeIngredientService recipeIngredientService,
                       DishMapper dishMapper, CategoryRepository categoryRepository,
                       WorkshopRepository workshopRepository, ModificationService modificationService) {
        this.itemRepository = itemRepository;
        this.dishMapper = dishMapper;
        this.recipeIngredientService = recipeIngredientService;
        this.categoryRepository = categoryRepository;
        this.workshopRepository = workshopRepository;
        this.modificationService = modificationService;
    }

    public List<DishDTO> getAll() {
        return itemRepository.findAllByDeletedIsFalseAndType(ItemType.DISH)
            .stream().map(dishMapper::toDto).collect(Collectors.toList());
    }

    public List<DishDTO> getDeleted() {
        return itemRepository.findAllByDeletedIsTrueAndType(ItemType.DISH)
            .stream().map(dishMapper::toDto).collect(Collectors.toList());
    }

    public DishDTO getById(UUID id) {
        return itemRepository.findByIdAndType(id, ItemType.DISH).map(dishMapper::toDto).orElseThrow();
    }

    public void create(DishRequest request) {
        Item item = new Item();
        fromRequest(item, request);
        item.setType(ItemType.DISH);
        item.setDeleted(false);
        item.setCreatedAt(OffsetDateTime.now());
        item.setUpdatedAt(OffsetDateTime.now());
        Item savedItem = itemRepository.save(item);
        request.getRecipeIngredients()
            .forEach(recipeIngredientRequest -> recipeIngredientService.create(savedItem, recipeIngredientRequest));
        request.getModificationGroups()
            .forEach(modificationGroupRequest -> modificationService.create(modificationGroupRequest, savedItem));
    }

    public void update(DishRequest request) {
        Item item = itemRepository.findByIdAndType(request.getId(), ItemType.DISH).orElseThrow();
        recipeIngredientService.delete(item);
        item.setRecipeStructures(null);
        modificationService.delete(item);
        item.setModificationGroups(null);
        fromRequest(item, request);
        item.setUpdatedAt(OffsetDateTime.now());
        Item savedItem = itemRepository.save(item);
        request.getRecipeIngredients()
            .forEach(recipeIngredientRequest -> recipeIngredientService.create(savedItem, recipeIngredientRequest));
        request.getModificationGroups()
            .forEach(modificationGroupRequest -> modificationService.create(modificationGroupRequest, savedItem));
    }

    public DishDTO delete(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.DISH).orElseThrow();
        item.setDeleted(true);
        item.setUpdatedAt(OffsetDateTime.now());
        return dishMapper.toDto(itemRepository.save(item));
    }

    public DishDTO recover(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.DISH).orElseThrow();
        item.setDeleted(false);
        item.setUpdatedAt(OffsetDateTime.now());
        return dishMapper.toDto(itemRepository.save(item));
    }

    private void fromRequest(Item item, DishRequest request) {
        item.setName(request.getName());
        item.setCode(request.getCode());
        item.setBarcode(request.getBarcode());
        item.setColor(request.getColor());
        item.setPhotoURL(request.getPhotoURL());
        item.setNoDiscount(request.getNoDiscount());
        item.setPrice(request.getPrice());
        item.setProductionDescription(request.getProductionDescription());
        item.setCookTimeSeconds(request.getCookTimeSeconds());
        item.setCategory(request.getCategoryId() == null ? null : categoryRepository.findById(request.getCategoryId()).orElse(null));
        item.setWorkshop(request.getWorkshopId() == null ? null : workshopRepository.findById(request.getWorkshopId()).orElse(null));
    }
}
