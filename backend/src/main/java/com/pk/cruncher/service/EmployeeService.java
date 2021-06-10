package com.pk.cruncher.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.pk.cruncher.contoller.v1.request.EmployeeRequest;
import com.pk.cruncher.dto.EmployeeDTO;
import com.pk.cruncher.dto.mapper.EmployeeMapper;
import com.pk.cruncher.entity.Employee;
import com.pk.cruncher.entity.type.Gender;
import com.pk.cruncher.repository.EmployeeRepository;
import com.pk.cruncher.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final PositionRepository positionRepository;
    private final EmployeeMapper employeeMapper;
    private final FirebaseAuth firebaseAuth;

    public EmployeeService(EmployeeRepository employeeRepository, PositionRepository positionRepository,
                           EmployeeMapper employeeMapper, FirebaseAuth firebaseAuth) {
        this.employeeRepository = employeeRepository;
        this.positionRepository = positionRepository;
        this.employeeMapper = employeeMapper;
        this.firebaseAuth = firebaseAuth;
    }

    public List<EmployeeDTO> getAll() {
        return employeeRepository.findAllByDeletedIsFalse()
            .stream().map(employeeMapper::toDto).collect(Collectors.toList());
    }

    public List<EmployeeDTO> getDeleted() {
        return employeeRepository.findAllByDeletedIsTrue()
            .stream().map(employeeMapper::toDto).collect(Collectors.toList());
    }

    public EmployeeDTO getById(UUID id) {
        return employeeRepository.findById(id).map(employeeMapper::toDto).orElseThrow();
    }

    public void create(EmployeeRequest request) throws FirebaseAuthException {
        String uid = createFirebaseUser(request);

        Employee employee = new Employee();
        fromRequest(employee, request);
        employee.setUid(uid);
        employee.setCreatedAt(OffsetDateTime.now());
        employee.setUpdatedAt(OffsetDateTime.now());
        employee.setDeleted(false);

        employeeRepository.save(employee);
    }

    public void update(EmployeeRequest request) throws FirebaseAuthException {
        Employee employee = employeeRepository.findById(request.getId()).orElseThrow();
        updateFirebaseUser(request, employee.getUid());
        fromRequest(employee, request);
        employee.setUpdatedAt(OffsetDateTime.now());
        employeeRepository.save(employee);
    }

    public void delete(UUID id) throws FirebaseAuthException {
        Employee employee = employeeRepository.findById(id).orElseThrow();
        disableFirebaseUser(employee.getUid());
        employee.setDeleted(true);
        employee.setUpdatedAt(OffsetDateTime.now());
        employeeRepository.save(employee);
    }

    public EmployeeDTO recover(UUID id) throws FirebaseAuthException {
        Employee employee = employeeRepository.findById(id).orElseThrow();
        enableFirebaseUser(employee.getUid());
        employee.setDeleted(false);
        employee.setUpdatedAt(OffsetDateTime.now());
        return employeeMapper.toDto(employeeRepository.save(employee));
    }

    private void fromRequest(Employee employee, EmployeeRequest request) {
        employee.setName(request.getName());
        employee.setPosition(request.getPositionId() == null ? null : positionRepository.findById(request.getPositionId()).orElseThrow());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setAddress(request.getAddress());
        employee.setGender(Gender.valueOf(request.getGender()));
        employee.setRms(request.getRms());
        employee.setPos(request.getPos());
        employee.setKds(request.getKds());
    }

    private String createFirebaseUser(EmployeeRequest request) throws FirebaseAuthException {
        UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest();
        createRequest.setDisplayName(request.getName());
        createRequest.setEmail(request.getEmail());
        createRequest.setPassword(request.getPassword());
        createRequest.setEmailVerified(true);
        createRequest.setDisabled(false);
        UserRecord userRecord = firebaseAuth.createUser(createRequest);

        UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(userRecord.getUid());
        updateRequest.setCustomClaims(generatePermissions(request));
        return firebaseAuth.updateUser(updateRequest).getUid();
    }

    private void updateFirebaseUser(EmployeeRequest request, String uid) throws FirebaseAuthException {
        UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(uid);
        updateRequest.setDisplayName(request.getName());
        updateRequest.setEmail(request.getEmail());
        updateRequest.setCustomClaims(generatePermissions(request));
        firebaseAuth.updateUser(updateRequest);
    }

    private void disableFirebaseUser(String uid) throws FirebaseAuthException {
        UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(uid);
        updateRequest.setDisabled(true);
        firebaseAuth.updateUser(updateRequest);
    }

    private void enableFirebaseUser(String uid) throws FirebaseAuthException {
        UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(uid);
        updateRequest.setDisabled(false);
        firebaseAuth.updateUser(updateRequest);
    }

    private Map<String, Object> generatePermissions(EmployeeRequest request){
        Map<String, Object> permissions = new HashMap<>();
        if (request.getRms()) permissions.put("rms", true);
        if (request.getPos()) permissions.put("pos", true);
        if (request.getKds()) permissions.put("kds", true);
        return permissions;
    }

}
