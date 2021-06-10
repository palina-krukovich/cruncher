package com.pk.cruncher.contoller.v1;

import com.google.firebase.auth.FirebaseAuthException;
import com.pk.cruncher.contoller.v1.request.EmployeeRequest;
import com.pk.cruncher.contoller.v1.request.PositionRequest;
import com.pk.cruncher.dto.EmployeeDTO;
import com.pk.cruncher.dto.PositionDTO;
import com.pk.cruncher.service.EmployeeService;
import com.pk.cruncher.service.PositionService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("access/")
public class AccessController {

    private final PositionService positionService;
    private final EmployeeService employeeService;

    public AccessController(PositionService positionService, EmployeeService employeeService) {
        this.positionService = positionService;
        this.employeeService = employeeService;
    }


    @GetMapping("getPositions")
    public List<PositionDTO> getPositions() {
        return positionService.getAll();
    }

    @GetMapping("getPosition")
    public PositionDTO getPosition(@RequestParam @NotNull UUID id) {
        return positionService.getById(id);
    }

    @PostMapping("createPosition")
    public void createPosition(@RequestBody @NotNull PositionRequest request) {
        positionService.create(request);
    }

    @PutMapping("updatePosition")
    public void updatePosition(@RequestBody @NotNull PositionRequest request) {
        positionService.update(request);
    }

    @DeleteMapping("deletePosition")
    public void deletePosition(@RequestParam @NotNull UUID id) {
        positionService.delete(id);
    }



    @GetMapping("getEmployees")
    public List<EmployeeDTO> getEmployees() {
        return employeeService.getAll();
    }

    @GetMapping("getEmployee")
    public EmployeeDTO getEmployee(@RequestParam @NotNull UUID id) {
        return employeeService.getById(id);
    }

    @GetMapping("getDeletedEmployees")
    public List<EmployeeDTO> getDeletedEmployees() {
        return employeeService.getDeleted();
    }

    @PostMapping("createEmployee")
    public void createEmployee(@RequestBody @NotNull EmployeeRequest request) throws FirebaseAuthException {
        employeeService.create(request);
    }

    @PutMapping("updateEmployee")
    public void updateEmployee(@RequestBody @NotNull EmployeeRequest request) throws FirebaseAuthException {
        employeeService.update(request);
    }

    @DeleteMapping("deleteEmployee")
    public void deleteEmployee(@RequestParam @NotNull UUID id) throws FirebaseAuthException {
        employeeService.delete(id);
    }

    @DeleteMapping("recoverEmployee")
    public EmployeeDTO recoverEmployee(@RequestParam @NotNull UUID id) throws FirebaseAuthException {
        return employeeService.recover(id);
    }
}
