package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.DiningTableRequest;
import com.pk.cruncher.contoller.v1.request.HallRequest;
import com.pk.cruncher.dto.HallDTO;
import com.pk.cruncher.dto.mapper.HallMapper;
import com.pk.cruncher.entity.DiningTable;
import com.pk.cruncher.entity.Hall;
import com.pk.cruncher.entity.type.Shape;
import com.pk.cruncher.repository.DiningTableRepository;
import com.pk.cruncher.repository.HallRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class HallService {
    private final HallRepository hallRepository;
    private final HallMapper hallMapper;
    private final DiningTableRepository diningTableRepository;


    public HallService(HallRepository hallRepository, HallMapper hallMapper, DiningTableRepository diningTableRepository) {
        this.hallRepository = hallRepository;
        this.hallMapper = hallMapper;
        this.diningTableRepository = diningTableRepository;
    }

    public List<HallDTO> getAll() {
        return hallRepository.findAll().stream()
            .map(hallMapper::toDto).collect(Collectors.toList());
    }

    public HallDTO getById(UUID id) {
        return hallRepository.findById(id).map(hallMapper::toDto).orElse(null);
    }

    public void create(HallRequest request) {
        Hall hall = new Hall();
        fromRequest(hall, request);
        hall.setDiningTables(
            request.getTables().stream().map(tableRequest -> {
                DiningTable diningTable = new DiningTable();
                fromRequest(diningTable, tableRequest);
                diningTable.setDeleted(false);
                diningTable.setHall(hall);
                return diningTable;
            }).collect(Collectors.toList())
        );
        hallRepository.save(hall);
    }

    public void update(HallRequest request) {
        Hall hall = hallRepository.findById(request.getId()).orElseThrow();
        fromRequest(hall, request);
        updateTables(hall, request.getTables());
        hallRepository.save(hall);
    }

    private void updateTables(Hall hall, List<DiningTableRequest> tableRequests) {
        List<DiningTable> oldTables = hall.getDiningTables();

        List<DiningTable> deletedTables = oldTables.stream()
            .filter(table -> tableRequests.stream().noneMatch(tableRequest -> tableRequest.getId() != null && tableRequest.getId().equals(table.getId())))
            .peek(deletedTable -> deletedTable.setDeleted(true)).collect(Collectors.toList());
        List<DiningTable> newTables = tableRequests.stream()
            .filter(tableRequest -> tableRequest.getId() == null)
            .map(tableRequest -> {
                DiningTable table = new DiningTable();
                fromRequest(table, tableRequest);
                table.setDeleted(false);
                table.setHall(hall);
                return table;
            }).collect(Collectors.toList());
        List<DiningTable> updatedTables = tableRequests.stream()
            .filter(tableRequest -> tableRequest.getId() != null && oldTables.stream().anyMatch(table -> table.getId().equals(tableRequest.getId())))
            .map(tableRequest -> {
                DiningTable table = oldTables.stream().filter(t -> t.getId().equals(tableRequest.getId())).findFirst().orElseThrow();
                fromRequest(table, tableRequest);
                return table;
            }).collect(Collectors.toList());
        List<DiningTable> allTables = new ArrayList<>();
        allTables.addAll(deletedTables);
        allTables.addAll(updatedTables);
        allTables.addAll(newTables);
        hall.setDiningTables(allTables);
        hallRepository.save(hall);
    }

    public void delete(UUID id) {
        Hall hall = hallRepository.findById(id).orElseThrow();
        hall.getDiningTables().forEach(table -> {
            table.setHall(null);
            diningTableRepository.save(table);
        });
        hallRepository.deleteById(id);
    }

    private void fromRequest(Hall hall, HallRequest request) {
        hall.setName(request.getName());
    }

    private void fromRequest(DiningTable table, DiningTableRequest request) {
        table.setName(request.getName());
        table.setCapacity(request.getCapacity());
        table.setShape(Shape.valueOf(request.getShape()));
        table.setWidth(request.getWidth());
        table.setHeight(request.getHeight());
        table.setX(request.getX());
        table.setY(request.getY());
    }
}
