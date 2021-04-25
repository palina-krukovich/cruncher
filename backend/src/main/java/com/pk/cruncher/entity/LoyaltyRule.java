package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.LoyaltyType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class LoyaltyRule extends BaseEntity {

    private LoyaltyType loyaltyType;

    private Long value;

    @ManyToOne
    @JoinColumn(name = "client_group_id")
    private ClientGroup clientGroup;
}
