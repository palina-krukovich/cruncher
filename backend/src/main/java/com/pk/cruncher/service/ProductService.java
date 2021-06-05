package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.ProductRequest;
import com.pk.cruncher.dto.ProductDTO;
import com.pk.cruncher.dto.mapper.ProductMapper;
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
public class ProductService {
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final WorkshopRepository workshopRepository;
    private final ProductMapper mapper;

    public ProductService(ItemRepository itemRepository, CategoryRepository categoryRepository,
                          WorkshopRepository workshopRepository, ProductMapper mapper) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
        this.workshopRepository = workshopRepository;
        this.mapper = mapper;
    }

    public List<ProductDTO> getAll() {
        return itemRepository.findAllByDeletedIsFalseAndType(ItemType.PRODUCT)
            .stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public List<ProductDTO> getDeleted() {
        return itemRepository.findAllByDeletedIsTrueAndType(ItemType.PRODUCT)
            .stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public ProductDTO getById(UUID id) {
        return itemRepository.findByIdAndType(id, ItemType.PRODUCT).map(mapper::toDto).orElseThrow();
    }

    public ProductDTO create(ProductRequest request) {
        Item item = new Item();
        fromRequest(item, request);
        item.setType(ItemType.PRODUCT);
        item.setDeleted(false);
        item.setCreatedAt(OffsetDateTime.now());
        item.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(itemRepository.save(item));
    }

    public ProductDTO update(ProductRequest request) {
        Item item = itemRepository.findByIdAndType(request.getId(), ItemType.PRODUCT).orElseThrow();
        fromRequest(item, request);
        item.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(itemRepository.save(item));
    }

    public ProductDTO delete(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.PRODUCT).orElseThrow();
        item.setDeleted(true);
        item.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(itemRepository.save(item));
    }

    public ProductDTO recover(UUID id) {
        Item item = itemRepository.findByIdAndType(id, ItemType.PRODUCT).orElseThrow();
        item.setDeleted(false);
        item.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(itemRepository.save(item));
    }

    private void fromRequest(Item item, ProductRequest request) {
        item.setCode(request.getCode());
        item.setBarcode(request.getBarcode());
        item.setName(request.getName());
        item.setColor(request.getColor());
        item.setPhotoURL(request.getPhotoURL());
        item.setNoDiscount(request.getNoDiscount());
        item.setCost(request.getCost());
        item.setPrice(request.getPrice());
        item.setCategory(request.getCategoryId() == null ? null : categoryRepository.findById(request.getCategoryId()).orElse(null));
        item.setWorkshop(request.getWorkshopId() == null ? null : workshopRepository.findById(request.getWorkshopId()).orElse(null));
    }
}
