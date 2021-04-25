package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.Unit;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Pack extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private Unit unit;

    @Column(nullable = false)
    private Double unitQuantity;

    @OneToMany(mappedBy = "pack")
    private List<ItemSupply> itemSupplies;
}
