package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.ReservationStatus;
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
public class Reservation extends BaseEntity {

    @ManyToMany
    @JoinTable(
        name = "reservation_table",
        joinColumns = @JoinColumn(name = "reservation_id"),
        inverseJoinColumns = @JoinColumn(name = "dining_table_id")
    )
    private List<DiningTable> diningTables;

    private ReservationStatus status;

    private Long guestsCount;

    private OffsetDateTime startsAt;

    private Long durationSeconds;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private String name;

    private String phone;

    private String email;

    private String comment;
}
