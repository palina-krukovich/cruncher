package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class HallRequest {
    private UUID id;
    private String name;
    private List<DiningTableRequest> tables;
}
