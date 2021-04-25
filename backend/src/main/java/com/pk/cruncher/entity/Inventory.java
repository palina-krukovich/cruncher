package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.InventoryStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Inventory extends BaseEntity {

    private OffsetDateTime checkedAt;

    private InventoryStatus status;

    @OneToMany(mappedBy = "inventory")
    private List<ItemInventory> itemInventories;
}
