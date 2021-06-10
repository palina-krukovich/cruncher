package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Employee extends BaseEntity {

    private String name;

    private Gender gender;

    private String phone;

    @Column(length = 320)
    private String email;

    private String address;

    @Column(unique = true)
    private String uid;

    private Boolean rms;

    private Boolean pos;

    private Boolean kds;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    private Boolean deleted;

    @OneToMany(mappedBy = "employee")
    private List<Order> orders;
}
