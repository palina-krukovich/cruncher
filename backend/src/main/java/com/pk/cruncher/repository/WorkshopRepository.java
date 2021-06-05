package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Workshop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkshopRepository extends JpaRepository<Workshop, UUID> {
    List<Workshop> findAllByDeletedIsFalse();
    List<Workshop> findAllByDeletedIsTrue();
}
