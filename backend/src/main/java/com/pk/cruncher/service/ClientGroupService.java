package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.ClientGroupRequest;
import com.pk.cruncher.dto.ClientGroupDTO;
import com.pk.cruncher.dto.mapper.ClientGroupMapper;
import com.pk.cruncher.entity.ClientGroup;
import com.pk.cruncher.entity.type.LoyaltyType;
import com.pk.cruncher.repository.ClientGroupRepository;
import com.pk.cruncher.repository.ClientRepository;
import com.pk.cruncher.repository.LoyaltyRuleRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClientGroupService {

    private final ClientGroupRepository clientGroupRepository;
    private final ClientRepository clientRepository;
    private final ClientGroupMapper clientGroupMapper;
    private final LoyaltyRuleRepository loyaltyRuleRepository;

    public ClientGroupService(ClientGroupRepository clientGroupRepository, ClientRepository clientRepository,
                              ClientGroupMapper clientGroupMapper, LoyaltyRuleRepository loyaltyRuleRepository) {
        this.clientGroupRepository = clientGroupRepository;
        this.clientRepository = clientRepository;
        this.clientGroupMapper = clientGroupMapper;
        this.loyaltyRuleRepository = loyaltyRuleRepository;
    }

    public List<ClientGroupDTO> getAll() {
        return clientGroupRepository.findAllByDeletedIsFalse()
            .stream().map(clientGroupMapper::toDto).collect(Collectors.toList());
    }

    public List<ClientGroupDTO> getDeleted() {
        return clientGroupRepository.findAllByDeletedIsTrue()
            .stream().map(clientGroupMapper::toDto).collect(Collectors.toList());
    }

    public ClientGroupDTO getById(UUID id) {
        return clientGroupRepository.findById(id).map(clientGroupMapper::toDto).orElseThrow();
    }

    public void create(ClientGroupRequest request) {
        ClientGroup clientGroup = new ClientGroup();
        fromRequest(clientGroup, request);
        clientGroup.setCreatedAt(OffsetDateTime.now());
        clientGroup.setUpdatedAt(OffsetDateTime.now());
        clientGroup.setDeleted(false);

        clientGroupRepository.save(clientGroup);
    }

    public void update(ClientGroupRequest request) {
        ClientGroup clientGroup = clientGroupRepository.findById(request.getId()).orElseThrow();
        fromRequest(clientGroup, request);
        clientGroup.setUpdatedAt(OffsetDateTime.now());
        clientGroupRepository.save(clientGroup);
    }

    public void delete(UUID id) {
        ClientGroup clientGroup = clientGroupRepository.findById(id).orElseThrow();
        if (clientGroup.getClients() != null) {
            clientGroup.getClients().forEach(client -> {
                client.setDeleted(true);
                clientRepository.save(client);
            });
        }
        if (clientGroup.getLoyaltyRules() != null) {
            clientGroup.getLoyaltyRules().forEach(loyaltyRuleRepository::delete);
            clientGroup.setLoyaltyRules(null);
        }
        clientGroup.setDeleted(true);
        clientGroup.setUpdatedAt(OffsetDateTime.now());
        clientGroupRepository.save(clientGroup);
    }

    public ClientGroupDTO recover(UUID id) {
        ClientGroup clientGroup = clientGroupRepository.findById(id).orElseThrow();
        if (clientGroup.getClients() != null) {
            clientGroup.getClients().forEach(client -> {
                client.setDeleted(false);
                clientRepository.save(client);
            });
        }
        clientGroup.setDeleted(false);
        clientGroup.setUpdatedAt(OffsetDateTime.now());
        return clientGroupMapper.toDto(clientGroupRepository.save(clientGroup));
    }

    private void fromRequest(ClientGroup clientGroup, ClientGroupRequest request) {
        clientGroup.setName(request.getName());
        clientGroup.setLoyaltyType(LoyaltyType.valueOf(request.getLoyaltyType()));
        clientGroup.setDiscountRate(request.getDiscountRate());
    }
}
