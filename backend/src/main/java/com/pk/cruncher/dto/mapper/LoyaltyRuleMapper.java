package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.LoyaltyRuleDTO;
import com.pk.cruncher.entity.LoyaltyRule;
import org.springframework.stereotype.Component;

@Component
public class LoyaltyRuleMapper implements BaseMapper<LoyaltyRule, LoyaltyRuleDTO> {

    private final ClientGroupMapper clientGroupMapper;

    public LoyaltyRuleMapper(ClientGroupMapper clientGroupMapper) {
        this.clientGroupMapper = clientGroupMapper;
    }

    @Override
    public LoyaltyRuleDTO toDto(LoyaltyRule entity) {
        return LoyaltyRuleDTO.builder()
            .id(entity.getId())
            .loyaltyType(entity.getLoyaltyType().toString())
            .value(entity.getValue())
            .clientGroup(clientGroupMapper.toDto(entity.getClientGroup()))
            .build();
    }
}
