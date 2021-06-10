package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.LoyaltyType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class ClientGroup extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    private LoyaltyType loyaltyType;

    private Double discountRate;

    private Boolean deleted;

    @OneToMany(mappedBy = "clientGroup")
    private List<Client> clients;

    @OneToMany(mappedBy = "clientGroup")
    private List<LoyaltyRule> loyaltyRules;
}
