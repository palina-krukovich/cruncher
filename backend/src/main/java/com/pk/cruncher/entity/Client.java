package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Client extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "client_group_id")
    private ClientGroup clientGroup;

    private String name;

    private Gender gender;

    private String phoneNumber;

    @Column(length = 320)
    private String email;

    private OffsetDateTime birthday;

    private String address;

    private String cardNumber;

    private String comment;

    private Double discountRate;

    private Double cashBackSum;

    @OneToMany(mappedBy = "client")
    private List<Order> orders;

    @OneToMany(mappedBy = "client")
    private List<Reservation> reservations;
}
