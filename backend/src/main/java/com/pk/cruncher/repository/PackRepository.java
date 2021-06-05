package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Pack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PackRepository extends JpaRepository<Pack, UUID> {
}
