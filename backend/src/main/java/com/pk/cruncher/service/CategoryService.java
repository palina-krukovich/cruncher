package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.CategoryRequest;
import com.pk.cruncher.dto.CategoryDTO;
import com.pk.cruncher.dto.mapper.CategoryMapper;
import com.pk.cruncher.entity.Category;
import com.pk.cruncher.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryDTO> getAll() {
        List<Category> topCategories = categoryRepository.findAllByParentCategoryIsNullAndDeletedIsFalse();
        return topCategories.stream().map(categoryMapper::toDto).collect(Collectors.toList());
    }

    public List<CategoryDTO> getDeleted() {
        List<Category> topCategories = categoryRepository.findAllByDeletedIsTrue()
            .stream()
            .filter(c -> c.getParentCategory() == null || !c.getParentCategory().getDeleted())
            .collect(Collectors.toList());
        return topCategories.stream().map(categoryMapper::toDto).collect(Collectors.toList());
    }

    public CategoryDTO getById(UUID id) {
        return categoryRepository.findById(id).map(categoryMapper::toDto).orElse(null);
    }

    public CategoryDTO create(CategoryRequest request) {
        Category category = new Category();
        fromRequest(category, request);
        category.setDeleted(false);
        category.setCreatedAt(OffsetDateTime.now());
        category.setUpdatedAt(OffsetDateTime.now());
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    public CategoryDTO update(CategoryRequest request) {
        Category category = categoryRepository.findById(request.getId()).orElseThrow();
        fromRequest(category, request);
        category.setUpdatedAt(OffsetDateTime.now());
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    public CategoryDTO delete(UUID id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        setDeletedToCategoryTree(category, true);
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    public CategoryDTO recover(UUID id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        setDeletedToCategoryTree(category, false);
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    private void fromRequest(Category category, CategoryRequest request) {
        category.setName(request.getName());
        category.setColor(request.getColor());
        category.setPhotoURL(request.getPhotoURL());
        if (request.getParentCategoryId() != null) {
            category.setParentCategory(categoryRepository.findById(request.getParentCategoryId()).orElse(null));
        }
    }

    private void setDeletedToCategoryTree(Category category, boolean flag) {
        category.setDeleted(flag);
        category.setUpdatedAt(OffsetDateTime.now());
        category.getSubCategories().forEach(subCategory -> setDeletedToCategoryTree(subCategory, flag));
    }
}
