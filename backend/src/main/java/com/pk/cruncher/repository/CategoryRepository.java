package com.pk.cruncher.repository;

import com.pk.cruncher.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findAllByParentCategoryIsNullAndDeletedIsFalse();
    List<Category> findAllByDeletedIsTrue();
}
