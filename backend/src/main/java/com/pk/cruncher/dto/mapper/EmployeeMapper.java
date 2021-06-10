package com.pk.cruncher.dto.mapper;

import com.google.firebase.auth.FirebaseAuth;
import com.pk.cruncher.dto.EmployeeDTO;
import com.pk.cruncher.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper implements BaseMapper<Employee, EmployeeDTO> {

    private final PositionMapper positionMapper;
    private final FirebaseAuth firebaseAuth;

    public EmployeeMapper(PositionMapper positionMapper, FirebaseAuth firebaseAuth) {
        this.positionMapper = positionMapper;
        this.firebaseAuth = firebaseAuth;
    }

    @Override
    public EmployeeDTO toDto(Employee entity) {
        return EmployeeDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .name(entity.getName())
            .gender(entity.getGender().toString())
            .phone(entity.getPhone())
            .email(entity.getEmail())
            .address(entity.getAddress())
            .position(entity.getPosition() == null ? null : positionMapper.toDto(entity.getPosition()))
            .rms(entity.getRms())
            .pos(entity.getPos())
            .kds(entity.getKds())
            .build();
    }
}
