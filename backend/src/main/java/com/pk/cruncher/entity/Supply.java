package com.pk.cruncher.entity;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Supply extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private OffsetDateTime suppliedAt;

    private String comment;

    @OneToMany(mappedBy = "supply")
    private List<ItemSupply> itemSupplies;
}
