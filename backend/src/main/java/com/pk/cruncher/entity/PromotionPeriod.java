package com.pk.cruncher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@Entity
@IdClass(PromotionPeriod.PromotionPeriodId.class)
public class PromotionPeriod {

    @Id
    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @Id
    private LocalTime startsAt;

    @Id
    private LocalTime endsAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class PromotionPeriodId implements Serializable {
        private Promotion promotion;
        private LocalTime startsAt;
        private LocalTime endsAt;
    }
}
