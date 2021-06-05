package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.WriteOffReasonRequest;
import com.pk.cruncher.contoller.v1.request.WriteOffRequest;
import com.pk.cruncher.dto.WriteOffDTO;
import com.pk.cruncher.dto.WriteOffReasonDTO;
import com.pk.cruncher.dto.mapper.WriteOffMapper;
import com.pk.cruncher.dto.mapper.WriteOffReasonMapper;
import com.pk.cruncher.entity.WriteOff;
import com.pk.cruncher.entity.WriteOffReason;
import com.pk.cruncher.repository.ItemRepository;
import com.pk.cruncher.repository.WriteOffReasonRepository;
import com.pk.cruncher.repository.WriteOffRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WriteOffService {
    private final WriteOffRepository writeOffRepository;
    private final WriteOffReasonRepository writeOffReasonRepository;
    private final WriteOffMapper writeOffMapper;
    private final WriteOffReasonMapper writeOffReasonMapper;
    private final ItemRepository itemRepository;

    public WriteOffService(WriteOffRepository writeOffRepository, WriteOffReasonRepository writeOffReasonRepository,
                           WriteOffMapper writeOffMapper, WriteOffReasonMapper writeOffReasonMapper,
                           ItemRepository itemRepository) {
        this.writeOffRepository = writeOffRepository;
        this.writeOffReasonRepository = writeOffReasonRepository;
        this.writeOffMapper = writeOffMapper;
        this.writeOffReasonMapper = writeOffReasonMapper;
        this.itemRepository = itemRepository;
    }

    public List<WriteOffDTO> getAll() {
        return writeOffRepository.findAll().stream().map(writeOffMapper::toDto).collect(Collectors.toList());
    }

    public WriteOffDTO getById(UUID id) {
        return writeOffRepository.findById(id).map(writeOffMapper::toDto).orElse(null);
    }

    public List<WriteOffReasonDTO> getWriteOffReasons() {
        return writeOffReasonRepository.findAll().stream()
            .map(writeOffReasonMapper::toDto).collect(Collectors.toList());
    }

    public void create(WriteOffRequest request) {
        WriteOff writeOff = new WriteOff();
        fromRequest(writeOff, request);
        writeOff.setCreatedAt(OffsetDateTime.now());
        writeOff.setUpdatedAt(OffsetDateTime.now());
        writeOffRepository.save(writeOff);
    }

    public WriteOffReasonDTO createWriteOffReason(WriteOffReasonRequest request) {
        WriteOffReason writeOffReason = new WriteOffReason();
        fromRequest(writeOffReason, request);
        return writeOffReasonMapper.toDto(writeOffReasonRepository.save(writeOffReason));
    }

    public void update(WriteOffRequest request) {
        WriteOff writeOff = writeOffRepository.findById(request.getId()).orElseThrow();
        fromRequest(writeOff, request);
        writeOff.setUpdatedAt(OffsetDateTime.now());
        writeOffRepository.save(writeOff);
    }

    public void delete(UUID id) {
        writeOffRepository.deleteById(id);
    }

    private void fromRequest(WriteOff writeOff, WriteOffRequest request) {
        writeOff.setItem(itemRepository.findById(request.getItemId()).orElseThrow());
        writeOff.setWrittenOffAt(request.getWrittenOffAt());
        writeOff.setAuto(request.getAuto());
        writeOff.setQuantity(request.getQuantity());
        WriteOffReason reason = writeOffReasonRepository.findById(request.getWriteOffReasonId()).orElseThrow();
        writeOff.setWriteOffReason(reason);
    }

    private void fromRequest(WriteOffReason reason, WriteOffReasonRequest request) {
        reason.setName(request.getName());
        reason.setDescription(request.getDescription());
    }
}
