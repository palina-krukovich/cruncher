package com.pk.cruncher.repository;

import com.pk.cruncher.entity.PromotionCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PromotionConditionRepository extends JpaRepository<PromotionCondition, UUID> {
}
