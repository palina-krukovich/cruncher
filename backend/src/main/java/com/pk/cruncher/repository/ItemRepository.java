package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.type.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findAllByDeletedIsFalseAndType(ItemType type);
    List<Item> findAllByDeletedIsTrueAndType(ItemType type);
    List<Item> findAllByDeletedIsFalseAndTypeIn(List<ItemType> types);
    Optional<Item> findByIdAndType(UUID id, ItemType type);
    Optional<Item> findByIdAndTypeIn(UUID id, List<ItemType> types);
}
