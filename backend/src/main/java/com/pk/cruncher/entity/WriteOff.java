package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class WriteOff extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private OffsetDateTime writtenOffAt;

    private Double quantity;

    private Boolean auto;

    @ManyToOne
    @JoinColumn(name = "write_off_reason_id")
    private WriteOffReason writeOffReason;
}
