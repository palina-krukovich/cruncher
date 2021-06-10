package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.ClientDTO;
import com.pk.cruncher.entity.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper implements BaseMapper<Client, ClientDTO> {

    private final ClientGroupMapper clientGroupMapper;

    public ClientMapper(ClientGroupMapper clientGroupMapper) {
        this.clientGroupMapper = clientGroupMapper;
    }

    @Override
    public ClientDTO toDto(Client entity) {
        return ClientDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .name(entity.getName())
            .clientGroup(clientGroupMapper.toDto(entity.getClientGroup()))
            .gender(entity.getGender().toString())
            .phone(entity.getPhoneNumber())
            .email(entity.getEmail())
            .birthday(entity.getBirthday())
            .address(entity.getAddress())
            .cardNumber(entity.getCardNumber())
            .comment(entity.getComment())
            .discountRate(entity.getDiscountRate())
            .build();
    }
}
