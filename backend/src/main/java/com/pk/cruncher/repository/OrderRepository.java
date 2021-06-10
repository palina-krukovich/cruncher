package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Query("select max(receiptNumber) from orders")
    Optional<Long> findMaxReceiptNumber();
}
