package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Supplier extends BaseEntity {
    private String name;

    private String address;

    private String phoneNumber;

    @Column(length = 4096)
    private String comment;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.DETACH)
    private List<Supply> supplies;
}
