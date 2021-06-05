package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.PrepackRequest;
import com.pk.cruncher.dto.PrepackDTO;
import com.pk.cruncher.dto.mapper.PrepackMapper;
import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PrepackService {
    private final ItemRepository itemRepository;
    private final PrepackMapper prepackMapper;
    private final RecipeIngredientService recipeIngredientService;

    public PrepackService(ItemRepository itemRepository, PrepackMapper prepackMapper,
                          RecipeIngredientService recipeIngredientService) {
        this.itemRepository = itemRepository;
        this.prepackMapper = prepackMapper;
        this.recipeIngredientService = recipeIngredientService;
    }

    public List<PrepackDTO> getAll() {
        return itemRepository.findAllByDeletedIsFalseAndType(ItemType.PREPACK)
            .stream().map(prepackMapper::toDto).collect(Collectors.toList());
    }

    public List<PrepackDTO> getDeleted() {
        return itemRepository.findAllByDeletedIsTrueAndType(ItemType.PREPACK)
            .stream().map(prepackMapper::toDto).collect(Collectors.toList());
    }

    public PrepackDTO getById(UUID id) {
        return itemRepository.findByIdAndType(id, ItemType.PREPACK)
            .map(prepackMapper::toDto).orElseThrow();
    }

    public void create(PrepackRequest request) {
        Item item = new Item();
        fromRequest(item, request);
        item.setType(ItemType.PREPACK);
        item.setDeleted(false);
        item.setCreatedAt(OffsetDateTime.now());
        item.setUpdatedAt(OffsetDateTime.now());
        Item savedItem = itemRepository.save(item);
        request.getRecipeIngredients()
            .forEach(recipeIngredientRequest -> recipeIngredientService.create(savedItem, recipeIngredientRequest));
    }

    public void update(PrepackRequest request) {
        Item item = itemRepository.findByIdAndType(request.getId(), ItemType.PREPACK).orElseThrow();
        recipeIngredientService.delete(item);
        fromRequest(item, request);
        item.setUpdatedAt(OffsetDateTime.now());
        Item savedItem = itemRepository.save(item);
        request.getRecipeIngredients()
            .forEach(recipeIngredientRequest -> recipeIngredientService.create(savedItem, recipeIngredientRequest));
    }

    public PrepackDTO delete(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.PREPACK).orElseThrow();
        item.setDeleted(true);
        item.setUpdatedAt(OffsetDateTime.now());
        return prepackMapper.toDto(itemRepository.save(item));
    }

    public PrepackDTO recover(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.PREPACK).orElseThrow();
        item.setDeleted(false);
        item.setUpdatedAt(OffsetDateTime.now());
        return prepackMapper.toDto(itemRepository.save(item));
    }

    private void fromRequest(Item item, PrepackRequest request) {
        item.setCode(request.getCode());
        item.setName(request.getName());
        item.setColor(request.getColor());
        item.setPhotoURL(request.getPhotoURL());
        item.setProductionDescription(request.getProductionDescription());
        item.setCookTimeSeconds(request.getCookTimeSeconds());
    }
}
