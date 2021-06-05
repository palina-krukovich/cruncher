package com.pk.cruncher.repository;

import com.pk.cruncher.entity.PromotionPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionPeriodRepository extends JpaRepository<PromotionPeriod, PromotionPeriod.PromotionPeriodId> {
}
