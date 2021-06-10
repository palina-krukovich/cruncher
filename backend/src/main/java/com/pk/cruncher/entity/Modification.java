package com.pk.cruncher.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Modification extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "modification_group_id")
    private ModificationGroup modificationGroup;

    private Boolean withoutWriteOff;

    private String name;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item modificationItem;

    private Double quantity;

    private Long price;

    private Boolean deleted;

    @ManyToMany(mappedBy = "modifications", cascade = CascadeType.ALL)
    private List<OrderedItem> orderedItems;
}
