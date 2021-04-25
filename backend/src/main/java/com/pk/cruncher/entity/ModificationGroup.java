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

    @ManyToMany
    @JoinTable(
        name = "menu_item_modification_group",
        joinColumns = @JoinColumn(name = "modification_group_id"),
        inverseJoinColumns = @JoinColumn(name = "menu_item_id")
    )
    private List<MenuItem> menuItems;

    @OneToMany(mappedBy = "modificationGroup")
    private List<Modification> modifications;
}
