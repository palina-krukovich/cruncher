package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class EmployeeRequest {
    private UUID id;
    private String name;
    private String gender;
    private String phone;
    private String email;
    private String address;
    private UUID positionId;
    private Boolean rms;
    private Boolean pos;
    private Boolean kds;
    private String password;
}
