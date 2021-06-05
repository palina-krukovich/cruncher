package com.pk.cruncher.repository;

import com.pk.cruncher.entity.ItemSupply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemSupplyRepository extends JpaRepository<ItemSupply, ItemSupply.ItemSupplyId> {
}
