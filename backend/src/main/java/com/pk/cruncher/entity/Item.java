package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.entity.type.Unit;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Item extends BaseEntity {

    @Column(unique = true)
    protected String code;

    protected String name;

    protected ItemType type;

    @Column(unique = true)
    protected String barcode;

    protected Unit unit;

    protected String color;

    protected String photoURL;

    protected Boolean deleted;

    @OneToMany(mappedBy = "modificationItem")
    private List<Modification> modifications;

    @OneToMany(mappedBy = "item")
    private List<WriteOff> writeOffs;

    @OneToMany(mappedBy = "item")
    private List<ItemInventory> itemInventories;

    @OneToMany(mappedBy = "item")
    private List<ItemSupply> itemSupplies;
}
