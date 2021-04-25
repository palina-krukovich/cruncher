package com.pk.cruncher.entity;

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
public class Hall extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    private String color;

    private String width;

    private String height;

    @OneToMany(mappedBy = "hall")
    private List<DiningTable> diningTables;
}
