package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.ItemSupplyRequest;
import com.pk.cruncher.contoller.v1.request.SupplyRequest;
import com.pk.cruncher.dto.ItemDTO;
import com.pk.cruncher.dto.SupplyDTO;
import com.pk.cruncher.dto.mapper.ItemMapper;
import com.pk.cruncher.dto.mapper.SupplyMapper;
import com.pk.cruncher.entity.ItemSupply;
import com.pk.cruncher.entity.Supply;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.repository.*;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SupplyService {
    private final SupplyRepository supplyRepository;
    private final ItemRepository itemRepository;
    private final PackRepository packRepository;
    private final SupplierRepository supplierRepository;
    private final SupplyMapper supplyMapper;
    private final ItemSupplyRepository itemSupplyRepository;
    private final ItemMapper itemMapper;

    public SupplyService(SupplyRepository supplyRepository, ItemRepository itemRepository,
                         PackRepository packRepository, SupplierRepository supplierRepository,
                         SupplyMapper supplyMapper, ItemSupplyRepository itemSupplyRepository,
                         ItemMapper itemMapper) {
        this.supplyRepository = supplyRepository;
        this.itemRepository = itemRepository;
        this.packRepository = packRepository;
        this.supplierRepository = supplierRepository;
        this.supplyMapper = supplyMapper;
        this.itemSupplyRepository = itemSupplyRepository;
        this.itemMapper = itemMapper;
    }

    public List<SupplyDTO> getAll() {
        return supplyRepository.findAll().stream().map(supplyMapper::toDto).collect(Collectors.toList());
    }

    public SupplyDTO getById(UUID id) {
        return supplyRepository.findById(id).map(supplyMapper::toDto).orElseThrow();
    }

    public List<ItemDTO> getSuppliedItems() {
        return itemRepository.findAllByDeletedIsFalseAndTypeIn(List.of(ItemType.PRODUCT, ItemType.INGREDIENT))
            .stream().map(itemMapper::toDto).collect(Collectors.toList());
    }

    public void create(SupplyRequest request) {
        Supply supply = new Supply();
        fromRequest(supply, request);
        supply.setCreatedAt(OffsetDateTime.now());
        supply.setUpdatedAt(OffsetDateTime.now());
        supplyRepository.save(supply);
    }

    public void update(SupplyRequest request) {
        Supply supply = supplyRepository.findById(request.getId()).orElseThrow();
        itemSupplyRepository.deleteAll(supply.getItemSupplies());
        fromRequest(supply, request);
        supply.setUpdatedAt(OffsetDateTime.now());
        supplyRepository.save(supply);
    }

    public void delete(UUID id) {
        supplyRepository.deleteById(id);
    }

    private void fromRequest(Supply supply, SupplyRequest request) {
        supply.setSupplier(supplierRepository.findById(request.getSupplierId()).orElseThrow());
        supply.setSuppliedAt(request.getSuppliedAt());
        supply.setComment(request.getComment());
        supply.setItemSupplies(request.getItemSupplies().stream().map(itemSupplyRequest -> {
           ItemSupply itemSupply = new ItemSupply();
           fromRequest(itemSupply, itemSupplyRequest);
           itemSupply.setSupply(supply);
           return itemSupply;
        }).collect(Collectors.toList()));
    }

    private void fromRequest(ItemSupply itemSupply, ItemSupplyRequest request) {
        itemSupply.setItem(itemRepository.findById(request.getItemId()).orElseThrow());
        itemSupply.setPack(request.getPackId() == null ? null : packRepository.findById(request.getPackId()).orElseThrow());
        itemSupply.setQuantity(request.getQuantity());
        itemSupply.setPricePerUnit(request.getPricePerUnit());
    }
}
