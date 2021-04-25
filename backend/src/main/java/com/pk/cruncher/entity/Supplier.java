package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

    private String comment;

    @OneToMany(mappedBy = "supplier")
    private List<Supply> supplies;
}
