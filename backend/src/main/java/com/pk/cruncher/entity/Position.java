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
public class Position extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String title;

    private String description;

    @OneToMany(mappedBy = "position")
    private List<Employee> employees;
}
