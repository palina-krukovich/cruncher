package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.ClientRequest;
import com.pk.cruncher.dto.ClientDTO;
import com.pk.cruncher.dto.mapper.ClientMapper;
import com.pk.cruncher.entity.Client;
import com.pk.cruncher.entity.type.Gender;
import com.pk.cruncher.repository.ClientGroupRepository;
import com.pk.cruncher.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private final ClientGroupRepository clientGroupRepository;

    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper,
                         ClientGroupRepository clientGroupRepository) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
        this.clientGroupRepository = clientGroupRepository;
    }


    public List<ClientDTO> getAll() {
        return clientRepository.findAllByDeletedIsFalse()
            .stream().map(clientMapper::toDto).collect(Collectors.toList());
    }

    public List<ClientDTO> getDeleted() {
        return clientRepository.findAllByDeletedIsTrue()
            .stream().map(clientMapper::toDto).collect(Collectors.toList());
    }

    public ClientDTO getById(UUID id) {
        return clientRepository.findById(id).map(clientMapper::toDto).orElseThrow();
    }

    public void create(ClientRequest request) {
        Client client = new Client();
        fromRequest(client, request);
        client.setCreatedAt(OffsetDateTime.now());
        client.setUpdatedAt(OffsetDateTime.now());
        client.setDeleted(false);
        client.setCashBackSum(.0);

        clientRepository.save(client);
    }

    public void update(ClientRequest request) {
        Client client = clientRepository.findById(request.getId()).orElseThrow();
        fromRequest(client, request);
        client.setUpdatedAt(OffsetDateTime.now());
        clientRepository.save(client);
    }

    public void delete(UUID id) {
        Client client = clientRepository.findById(id).orElseThrow();
        client.setDeleted(true);
        client.setUpdatedAt(OffsetDateTime.now());
        clientRepository.save(client);
    }

    public ClientDTO recover(UUID id) {
        Client client = clientRepository.findById(id).orElseThrow();
        client.setDeleted(false);
        client.setUpdatedAt(OffsetDateTime.now());
        return clientMapper.toDto(clientRepository.save(client));
    }

    private void fromRequest(Client client, ClientRequest request) {
        client.setName(request.getName());
        client.setClientGroup(clientGroupRepository.findById(request.getClientGroupId()).orElseThrow());
        client.setGender(Gender.valueOf(request.getGender()));
        client.setPhoneNumber(request.getPhoneNumber());
        client.setEmail(request.getEmail());
        client.setBirthday(request.getBirthday());
        client.setAddress(request.getAddress());
        client.setCardNumber(request.getCardNumber());
        client.setComment(request.getComment());
        client.setDiscountRate(request.getDiscountRate());
    }
}
