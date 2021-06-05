package com.pk.cruncher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class WriteOffReason extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 4096)
    private String description;

    @OneToMany(mappedBy = "writeOffReason", cascade = CascadeType.ALL)
    private List<WriteOff> writeOffs;
}
