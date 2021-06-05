package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.ModificationGroupType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class ModificationGroup extends BaseEntity {

    @Column(nullable = false)
    private ModificationGroupType type;

    @Column(nullable = false, unique = true)
    private String name;

    private Long minNum;

    private Long maxNum;

    private Boolean deleted;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @OneToMany(mappedBy = "modificationGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Modification> modifications;
}
