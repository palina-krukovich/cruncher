package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.WriteOffDTO;
import com.pk.cruncher.entity.WriteOff;
import org.springframework.stereotype.Component;

@Component
public class WriteOffMapper implements BaseMapper<WriteOff, WriteOffDTO> {

    private final ItemMapper itemMapper;
    private final WriteOffReasonMapper writeOffReasonMapper;

    public WriteOffMapper(ItemMapper itemMapper, WriteOffReasonMapper writeOffReasonMapper) {
        this.itemMapper = itemMapper;
        this.writeOffReasonMapper = writeOffReasonMapper;
    }

    @Override
    public WriteOffDTO toDto(WriteOff entity) {
        return WriteOffDTO.builder()
            .id(entity.getId())
            .item(itemMapper.toDto(entity.getItem()))
            .writtenOffAt(entity.getWrittenOffAt())
            .quantity(entity.getQuantity())
            .writeOffReason(entity.getWriteOffReason() == null ? null : writeOffReasonMapper.toDto(entity.getWriteOffReason()))
            .build();
    }
}
