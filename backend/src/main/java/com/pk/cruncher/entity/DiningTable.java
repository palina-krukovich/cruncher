package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class DiningTable extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;

    private String name;

    private Long number;

    private Long capacity;

    private Shape shape;

    private String color;

    private Double x;

    private Double y;

    private Double width;

    private Double height;

    private Boolean deleted;

    @OneToMany(mappedBy = "diningTable")
    private List<Order> orders;

    @ManyToMany(mappedBy = "diningTables")
    private List<Reservation> reservations;
}
