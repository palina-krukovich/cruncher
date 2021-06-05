package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Modification;
import com.pk.cruncher.entity.ModificationGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ModificationRepository extends JpaRepository<Modification, UUID> {
    List<Modification> findAllByModificationGroup(ModificationGroup modificationGroup);
}
