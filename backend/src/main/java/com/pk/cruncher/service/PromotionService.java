package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.PromotionBonusRequest;
import com.pk.cruncher.contoller.v1.request.PromotionConditionRequest;
import com.pk.cruncher.contoller.v1.request.PromotionPeriodRequest;
import com.pk.cruncher.contoller.v1.request.PromotionRequest;
import com.pk.cruncher.dto.CategoryDTO;
import com.pk.cruncher.dto.ItemDTO;
import com.pk.cruncher.dto.PromotionDTO;
import com.pk.cruncher.dto.mapper.CategoryMapper;
import com.pk.cruncher.dto.mapper.ItemMapper;
import com.pk.cruncher.dto.mapper.PromotionMapper;
import com.pk.cruncher.entity.*;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.entity.type.PromotionConditionExactly;
import com.pk.cruncher.entity.type.PromotionConditionRule;
import com.pk.cruncher.entity.type.PromotionResult;
import com.pk.cruncher.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PromotionService {
    private final PromotionRepository promotionRepository;
    private final PromotionMapper promotionMapper;
    private final PromotionPeriodRepository promotionPeriodRepository;
    private final PromotionConditionRepository promotionConditionRepository;
    private final PromotionBonusRepository promotionBonusRepository;
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final ItemMapper itemMapper;

    public PromotionService(PromotionRepository promotionRepository, PromotionMapper promotionMapper,
                            PromotionPeriodRepository promotionPeriodRepository,
                            PromotionConditionRepository promotionConditionRepository,
                            PromotionBonusRepository promotionBonusRepository, ItemRepository itemRepository,
                            CategoryRepository categoryRepository, CategoryMapper categoryMapper,
                            ItemMapper itemMapper) {
        this.promotionRepository = promotionRepository;
        this.promotionMapper = promotionMapper;
        this.promotionPeriodRepository = promotionPeriodRepository;
        this.promotionConditionRepository = promotionConditionRepository;
        this.promotionBonusRepository = promotionBonusRepository;
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.itemMapper = itemMapper;
    }


    public List<PromotionDTO> getAll() {
        return promotionRepository.findAll().stream().map(promotionMapper::toDto).collect(Collectors.toList());
    }

    public PromotionDTO getById(UUID id) {
        return promotionRepository.findById(id).map(promotionMapper::toDto).orElse(null);
    }

    public List<CategoryDTO> getPromotionCategories() {
        return categoryRepository.findAllByParentCategoryIsNullAndDeletedIsFalse()
            .stream().map(categoryMapper::toDto).collect(Collectors.toList());
    }

    public List<ItemDTO> getPromotionItems() {
        return itemRepository.findAllByDeletedIsFalseAndTypeIn(List.of(ItemType.PRODUCT, ItemType.DISH))
            .stream().map(itemMapper::toDto).collect(Collectors.toList());
    }

    public void create(PromotionRequest request) {
        Promotion promotion = new Promotion();
        fromRequest(promotion, request);
        promotionRepository.save(promotion);
    }

    public void update(PromotionRequest request) {
        Promotion promotion = promotionRepository.findById(request.getId()).orElseThrow();
        if (promotion.getPromotionPeriods() != null) {
            promotionPeriodRepository.deleteAll(promotion.getPromotionPeriods());
            promotion.setPromotionPeriods(null);
        }
        if (promotion.getPromotionConditions() != null) {
            promotionConditionRepository.deleteAll(promotion.getPromotionConditions());
            promotion.setPromotionConditions(null);
        }
        if (promotion.getPromotionBonuses() != null) {
            promotionBonusRepository.deleteAll(promotion.getPromotionBonuses());
            promotion.setPromotionBonuses(null);
        }
        fromRequest(promotion, request);
        promotionRepository.save(promotion);
    }

    public void delete(UUID id) {
        promotionRepository.deleteById(id);
    }

    private void fromRequest(Promotion promotion, PromotionRequest request) {
        promotion.setName(request.getName());
        promotion.setAccrualBonuses(request.getAccrualBonuses());
        promotion.setStartsAt(request.getStartsAt());
        promotion.setEndsAt(request.getEndsAt());
        promotion.setConditionRule(request.getConditionRule() == null ? null : PromotionConditionRule.valueOf(request.getConditionRule()));
        promotion.setConditionExactly(request.getConditionExactly() == null ? null : PromotionConditionExactly.valueOf(request.getConditionExactly()));
        promotion.setActiveMonday(request.getActiveMonday());
        promotion.setActiveTuesday(request.getActiveTuesday());
        promotion.setActiveWednesday(request.getActiveWednesday());
        promotion.setActiveThursday(request.getActiveThursday());
        promotion.setActiveFriday(request.getActiveFriday());
        promotion.setActiveSaturday(request.getActiveSaturday());
        promotion.setActiveSunday(request.getActiveSunday());
        promotion.setResult(request.getResult() == null ? null : PromotionResult.valueOf(request.getResult()));
        promotion.setBonusProductsCount(request.getBonusProductsCount());
        promotion.setBonusProductsResult(request.getBonusProductsResult() == null ? null : PromotionResult.valueOf(request.getBonusProductsResult()));
        promotion.setBonusProductsResultValue(request.getBonusProductsResultValue());
        promotion.setDiscountValue(request.getDiscountValue());
        promotion.setPromotionPeriods(request.getPromotionPeriods() == null ? null : request.getPromotionPeriods().stream().map(periodRequest -> {
            PromotionPeriod promotionPeriod = new PromotionPeriod();
            fromRequest(promotionPeriod, periodRequest);
            promotionPeriod.setPromotion(promotion);
            return promotionPeriod;
        }).collect(Collectors.toList()));
        promotion.setPromotionConditions(request.getPromotionConditions() == null ? null : request.getPromotionConditions().stream().map(conditionRequest -> {
            PromotionCondition promotionCondition = new PromotionCondition();
            fromRequest(promotionCondition, conditionRequest);
            promotionCondition.setPromotion(promotion);
            return promotionCondition;
        }).collect(Collectors.toList()));
        promotion.setPromotionBonuses(request.getPromotionBonuses() == null ? null : request.getPromotionBonuses().stream().map(bonusRequest -> {
            PromotionBonus promotionBonus = new PromotionBonus();
            fromRequest(promotionBonus, bonusRequest);
            promotionBonus.setPromotion(promotion);
            return promotionBonus;
        }).collect(Collectors.toList()));
    }

    private void fromRequest(PromotionPeriod promotionPeriod, PromotionPeriodRequest request) {
        promotionPeriod.setStartHours(request.getStartHours());
        promotionPeriod.setStartMinutes(request.getStartMinutes());
        promotionPeriod.setEndHours(request.getEndHours());
        promotionPeriod.setEndMinutes(request.getEndMinutes());
    }

    private void fromRequest(PromotionCondition promotionCondition, PromotionConditionRequest request) {
        promotionCondition.setQuantity(request.getQuantity());
        promotionCondition.setSum(request.getSum());
        promotionCondition.setItem(request.getItemId() == null ? null : itemRepository.findById(request.getItemId()).orElse(null));
    }

    private void fromRequest(PromotionBonus promotionBonus, PromotionBonusRequest request) {
        promotionBonus.setFixedPrice(request.getFixedPrice());
        promotionBonus.setItem(request.getItemId() == null ? null : itemRepository.findById(request.getItemId()).orElse(null));
    }
}
