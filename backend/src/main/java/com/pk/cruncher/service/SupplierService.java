package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.SupplierRequest;
import com.pk.cruncher.dto.SupplierDTO;
import com.pk.cruncher.dto.mapper.SupplierMapper;
import com.pk.cruncher.entity.Supplier;
import com.pk.cruncher.entity.Supply;
import com.pk.cruncher.repository.SupplierRepository;
import com.pk.cruncher.repository.SupplyRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;
    private final SupplyRepository supplyRepository;

    public SupplierService(SupplierRepository supplierRepository, SupplierMapper supplierMapper,
                           SupplyRepository supplyRepository) {
        this.supplierRepository = supplierRepository;
        this.supplierMapper = supplierMapper;
        this.supplyRepository = supplyRepository;
    }

    public List<SupplierDTO> getAll() {
        return supplierRepository.findAll().stream().map(supplierMapper::toDto).collect(Collectors.toList());
    }

    public SupplierDTO getById(UUID id) {
        return supplierRepository.findById(id).map(supplierMapper::toDto).orElseThrow();
    }

    public void create(SupplierRequest request) {
        Supplier supplier = new Supplier();
        fromRequest(supplier, request);
        supplier.setCreatedAt(OffsetDateTime.now());
        supplier.setUpdatedAt(OffsetDateTime.now());
        supplierRepository.save(supplier);
    }

    public void update(SupplierRequest request) {
        Supplier supplier = supplierRepository.findById(request.getId()).orElseThrow();
        fromRequest(supplier, request);
        supplier.setUpdatedAt(OffsetDateTime.now());
        supplierRepository.save(supplier);
    }

    public void delete(UUID id) {
        Supplier supplier = supplierRepository.findById(id).orElseThrow();
        for (Supply supply : supplier.getSupplies()) {
            supply.setSupplier(null);
            supplyRepository.save(supply);
        }
        supplierRepository.deleteById(id);
    }

    private void fromRequest(Supplier supplier, SupplierRequest request) {
        supplier.setName(request.getName());
        supplier.setAddress(request.getAddress());
        supplier.setPhoneNumber(request.getPhoneNumber());
        supplier.setComment(request.getComment());
    }
}
