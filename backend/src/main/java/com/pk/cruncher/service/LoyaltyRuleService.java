package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.LoyaltyRuleRequest;
import com.pk.cruncher.dto.LoyaltyRuleDTO;
import com.pk.cruncher.dto.mapper.LoyaltyRuleMapper;
import com.pk.cruncher.entity.LoyaltyRule;
import com.pk.cruncher.entity.type.LoyaltyType;
import com.pk.cruncher.repository.ClientGroupRepository;
import com.pk.cruncher.repository.LoyaltyRuleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LoyaltyRuleService {

    private final LoyaltyRuleRepository loyaltyRuleRepository;
    private final LoyaltyRuleMapper loyaltyRuleMapper;
    private final ClientGroupRepository clientGroupRepository;

    public LoyaltyRuleService(LoyaltyRuleRepository loyaltyRuleRepository, LoyaltyRuleMapper loyaltyRuleMapper,
                              ClientGroupRepository clientGroupRepository) {
        this.loyaltyRuleRepository = loyaltyRuleRepository;
        this.loyaltyRuleMapper = loyaltyRuleMapper;
        this.clientGroupRepository = clientGroupRepository;
    }

    public List<LoyaltyRuleDTO> getAll() {
        return loyaltyRuleRepository.findAll().stream().map(loyaltyRuleMapper::toDto).collect(Collectors.toList());
    }

    public LoyaltyRuleDTO getById(UUID id) {
        return loyaltyRuleRepository.findById(id).map(loyaltyRuleMapper::toDto).orElse(null);
    }

    public List<LoyaltyRuleDTO> updateLoyaltyRules(List<LoyaltyRuleRequest> requests) {
        List<LoyaltyRule> updatedRules = new ArrayList<>();

        requests.forEach(request -> {
            // New rule
            if (request.getId() == null) {
                LoyaltyRule rule = new LoyaltyRule();
                fromRequest(rule, request);
                updatedRules.add(rule);
            } else {
                Optional<LoyaltyRule> ruleOpt = loyaltyRuleRepository.findById(request.getId());
                // Updated rule
                if (ruleOpt.isPresent()) {
                    LoyaltyRule rule = ruleOpt.get();
                    fromRequest(rule, request);
                    updatedRules.add(rule);
                }
            }
        });
        loyaltyRuleRepository.deleteAll();
        return loyaltyRuleRepository.saveAll(updatedRules)
            .stream().map(loyaltyRuleMapper::toDto).collect(Collectors.toList());
    }

    private void fromRequest(LoyaltyRule loyaltyRule, LoyaltyRuleRequest request) {
        loyaltyRule.setLoyaltyType(LoyaltyType.valueOf(request.getLoyaltyType()));
        loyaltyRule.setClientGroup(clientGroupRepository.findById(request.getClientGroupId()).orElseThrow());
        loyaltyRule.setValue(request.getValue());
    }
}
