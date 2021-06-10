package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    List<Client> findAllByDeletedIsFalse();
    List<Client> findAllByDeletedIsTrue();
}
