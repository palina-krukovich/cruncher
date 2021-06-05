package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.PackRequest;
import com.pk.cruncher.dto.PackDTO;
import com.pk.cruncher.dto.mapper.PackMapper;
import com.pk.cruncher.entity.Pack;
import com.pk.cruncher.entity.type.Unit;
import com.pk.cruncher.repository.PackRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PackService {
    private final PackRepository packRepository;
    private final PackMapper packMapper;

    public PackService(PackRepository packRepository, PackMapper packMapper) {
        this.packRepository = packRepository;
        this.packMapper = packMapper;
    }

    public List<PackDTO> getAll() {
        return packRepository.findAll().stream().map(packMapper::toDto).collect(Collectors.toList());
    }

    public PackDTO getById(UUID id) {
        return packRepository.findById(id).map(packMapper::toDto).orElse(null);
    }

    public void create(PackRequest request) {
        Pack pack = new Pack();
        fromRequest(pack, request);
        packRepository.save(pack);
    }

    public void update(PackRequest request) {
        Pack pack = packRepository.findById(request.getId()).orElseThrow();
        fromRequest(pack, request);
        packRepository.save(pack);
    }

    public void delete(UUID id) {
        packRepository.deleteById(id);
    }

    private void fromRequest(Pack pack, PackRequest request) {
        pack.setName(request.getName());
        pack.setUnit(Unit.valueOf(request.getUnit()));
        pack.setUnitQuantity(request.getUnitQuantity());
    }
}
