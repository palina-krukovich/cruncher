package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.ModificationGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ModificationGroupRepository extends JpaRepository<ModificationGroup, UUID> {
    List<ModificationGroup> findAllByItem(Item item);
}
