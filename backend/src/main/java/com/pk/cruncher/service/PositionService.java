package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.PositionRequest;
import com.pk.cruncher.dto.PositionDTO;
import com.pk.cruncher.dto.mapper.PositionMapper;
import com.pk.cruncher.entity.Employee;
import com.pk.cruncher.entity.Position;
import com.pk.cruncher.repository.EmployeeRepository;
import com.pk.cruncher.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PositionService {
    private final PositionRepository positionRepository;
    private final PositionMapper positionMapper;
    private final EmployeeRepository employeeRepository;

    public PositionService(PositionRepository positionRepository, PositionMapper positionMapper,
                           EmployeeRepository employeeRepository) {
        this.positionRepository = positionRepository;
        this.positionMapper = positionMapper;
        this.employeeRepository = employeeRepository;
    }

    public List<PositionDTO> getAll() {
        return positionRepository.findAll().stream().map(positionMapper::toDto).collect(Collectors.toList());
    }

    public PositionDTO getById(UUID id) {
        return positionRepository.findById(id).map(positionMapper::toDto).orElse(null);
    }

    public void create(PositionRequest request) {
        Position position = new Position();
        fromRequest(position, request);
        position.setCreatedAt(OffsetDateTime.now());
        position.setUpdatedAt(OffsetDateTime.now());
        positionRepository.save(position);
    }

    public void update(PositionRequest request) {
        Position position = positionRepository.findById(request.getId()).orElseThrow();
        fromRequest(position, request);
        position.setUpdatedAt(OffsetDateTime.now());
        positionRepository.save(position);
    }

    public void delete(UUID id) {
        Position position = positionRepository.findById(id).orElseThrow();
        List<Employee> employees = position.getEmployees();
        if (employees != null && employees.size() > 0) {
            employeeRepository.saveAll(employees.stream()
                .peek(employee -> employee.setPosition(null)).collect(Collectors.toList()));
        }
        positionRepository.deleteById(id);
    }

    private void fromRequest(Position position, PositionRequest request) {
        position.setTitle(request.getTitle());
        position.setDescription(request.getDescription());
    }
}
