package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.UUID;

@Data
public class SupplierRequest {
    private UUID id;
    private String name;
    private String address;
    private String phoneNumber;
    private String comment;
}
