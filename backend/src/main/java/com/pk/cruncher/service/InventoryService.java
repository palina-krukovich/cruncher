package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.InventoryRequest;
import com.pk.cruncher.dto.InventoryDTO;
import com.pk.cruncher.dto.StockDTO;
import com.pk.cruncher.dto.mapper.InventoryMapper;
import com.pk.cruncher.dto.mapper.StockMapper;
import com.pk.cruncher.entity.Inventory;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.repository.InventoryRepository;
import com.pk.cruncher.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;
    private final InventoryMapper inventoryMapper;
    private final StockMapper stockMapper;

    public InventoryService(InventoryRepository inventoryRepository, ItemRepository itemRepository,
                            InventoryMapper inventoryMapper, StockMapper stockMapper) {
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
        this.inventoryMapper = inventoryMapper;
        this.stockMapper = stockMapper;
    }

    public List<InventoryDTO> getAll() {
        return inventoryRepository.findAll().stream().map(inventoryMapper::toDto).collect(Collectors.toList());
    }

    public List<StockDTO> getStock() {
        return itemRepository.findAllByDeletedIsFalseAndTypeIn(List.of(ItemType.PRODUCT, ItemType.INGREDIENT))
            .stream().map(stockMapper::toDto).collect(Collectors.toList());
    }

    public InventoryDTO getById(UUID id) {
        return inventoryRepository.findById(id).map(inventoryMapper::toDto).orElseThrow();
    }

    public List<InventoryDTO> getByCheckedAt(OffsetDateTime checkedAt) {
        return inventoryRepository.findAllByCheckedAt(checkedAt).stream()
            .map(inventoryMapper::toDto).collect(Collectors.toList());
    }

    public void create(List<InventoryRequest> requests) {
        List<Inventory> inventories = requests.stream().map(request -> {
            Inventory inventory = new Inventory();
            fromRequest(inventory, request);
            inventory.setCreatedAt(OffsetDateTime.now());
            inventory.setUpdatedAt(OffsetDateTime.now());
            return inventory;
        }).collect(Collectors.toList());
        inventoryRepository.saveAll(inventories);
    }

    public void update(List<InventoryRequest> requests) {
        List<Inventory> inventories = requests.stream().map(request -> {
            Inventory inventory = inventoryRepository.findById(request.getId()).orElseThrow();
            fromRequest(inventory, request);
            inventory.setUpdatedAt(OffsetDateTime.now());
            return inventory;
        }).collect(Collectors.toList());
        inventoryRepository.saveAll(inventories);
    }

    public void delete(List<UUID> ids) {
        ids.forEach(inventoryRepository::deleteById);
    }

    private void fromRequest(Inventory inventory, InventoryRequest request) {
        inventory.setCheckedAt(request.getCheckedAt());
        inventory.setItem(itemRepository.findById(request.getItemId()).orElseThrow());
        inventory.setActualQuantity(request.getActualQuantity());
    }

}
