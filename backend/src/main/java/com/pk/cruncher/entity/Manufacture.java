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
public class Manufacture extends BaseEntity {

    private OffsetDateTime manufacturedAt;

    private Double quantity;

    @ManyToOne
    @JoinColumn(name = "prepared_item_id")
    private PreparedItem preparedItem;
}
