package com.pk.cruncher.repository;

import com.pk.cruncher.entity.ClientGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClientGroupRepository extends JpaRepository<ClientGroup, UUID> {
}
