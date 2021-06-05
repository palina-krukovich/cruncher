package com.pk.cruncher.repository;

import com.pk.cruncher.entity.OrderedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderedItemRepository extends JpaRepository<OrderedItem, UUID> {
}
