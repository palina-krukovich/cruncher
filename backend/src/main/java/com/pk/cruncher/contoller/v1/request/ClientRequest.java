package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class ClientRequest {
    private UUID id;
    private String name;
    private String gender;
    private String phoneNumber;
    private String email;
    private OffsetDateTime birthday;
    private String address;
    private String cardNumber;
    private String comment;
    private Double discountRate;
    private UUID clientGroupId;
}
