package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.WorkshopRequest;
import com.pk.cruncher.dto.WorkshopDTO;
import com.pk.cruncher.dto.mapper.WorkshopMapper;
import com.pk.cruncher.entity.Workshop;
import com.pk.cruncher.repository.WorkshopRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WorkshopService {
    private final WorkshopRepository repository;
    private final WorkshopMapper mapper;

    public WorkshopService(WorkshopRepository repository, WorkshopMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<WorkshopDTO> getAll() {
        return repository.findAllByDeletedIsFalse()
            .stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public WorkshopDTO getById(UUID id) {
        return repository.findById(id).map(mapper::toDto).orElse(null);
    }

    public List<WorkshopDTO> getDeleted() {
        return repository.findAllByDeletedIsTrue()
            .stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public WorkshopDTO create(WorkshopRequest request) {
        Workshop workshop = new Workshop();
        fromRequest(workshop, request);
        workshop.setDeleted(false);
        workshop.setCreatedAt(OffsetDateTime.now());
        workshop.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(repository.save(workshop));
    }

    public WorkshopDTO update(WorkshopRequest request) {
        Workshop workshop = repository.findById(request.getId()).orElseThrow();
        fromRequest(workshop, request);
        workshop.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(repository.save(workshop));
    }

    public WorkshopDTO delete(UUID id) {
        Workshop workshop = repository.findById(id).orElseThrow();
        workshop.setDeleted(true);
        workshop.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(repository.save(workshop));
    }

    public WorkshopDTO recover(UUID id) {
        Workshop workshop = repository.findById(id).orElseThrow();
        workshop.setDeleted(false);
        workshop.setUpdatedAt(OffsetDateTime.now());
        return mapper.toDto(repository.save(workshop));    }

    private void fromRequest(Workshop workshop, WorkshopRequest request) {
        workshop.setName(request.getName());
    }
}
