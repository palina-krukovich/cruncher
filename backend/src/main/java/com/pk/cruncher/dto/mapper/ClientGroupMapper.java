package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.ClientGroupDTO;
import com.pk.cruncher.entity.ClientGroup;
import org.springframework.stereotype.Component;

@Component
public class ClientGroupMapper implements BaseMapper<ClientGroup, ClientGroupDTO> {

    @Override
    public ClientGroupDTO toDto(ClientGroup entity) {
        return ClientGroupDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .name(entity.getName())
            .loyaltyType(entity.getLoyaltyType().toString())
            .discountRate(entity.getDiscountRate())
            .build();
    }
}
