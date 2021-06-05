package com.pk.cruncher.contoller.v1.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ModificationGroupRequest {
    private UUID id;
    private String name;
    private String type;
    private Long minNum;
    private Long maxNum;
    private List<ModificationRequest> modifications;
}
