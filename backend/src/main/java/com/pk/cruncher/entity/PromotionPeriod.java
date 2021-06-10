package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class PromotionPeriod extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    private Long startHours;
    private Long startMinutes;

    private Long endHours;
    private Long endMinutes;
}
