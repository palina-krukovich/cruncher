package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.OrderItemDTO;
import com.pk.cruncher.entity.Modification;
import com.pk.cruncher.entity.OrderedItem;
import com.pk.cruncher.entity.Promotion;
import com.pk.cruncher.entity.PromotionCondition;
import com.pk.cruncher.entity.type.PromotionResult;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderItemMapper implements BaseMapper<OrderedItem, OrderItemDTO> {
    @Override
    public OrderItemDTO toDto(OrderedItem entity) {
        return OrderItemDTO.builder()
            .id(entity.getId())
            .itemId(entity.getItem() == null ? null : entity.getItem().getId())
            .itemName(entity.getItem() == null ? null : entity.getItem().getName())
            .itemPrice(entity.getItem() == null ? null : entity.getItem().getPrice())
            .modificationNames(entity.getModifications() == null ? Collections.emptyList()
                : entity.getModifications().stream().map(Modification::getName).collect(Collectors.toList()))
            .promotionNames(getPromotionNames(entity))
            .quantity(entity.getQuantity())
            .pricePerItem(entity.getPricePerItem())
            .subtotal(entity.getSubtotal())
            .discountRate(entity.getDiscountRate())
            .discountAmount(entity.getDiscountAmount())
            .totalPrice(entity.getTotalPrice())
            .status(entity.getStatus().toString())
            .build();
    }

    private List<String> getPromotionNames(OrderedItem orderedItem) {
        if (orderedItem.getItem() != null && orderedItem.getItem().getPromotionConditions() != null) {
            return orderedItem.getItem().getPromotionConditions().stream()
                .map(PromotionCondition::getPromotion)
                .filter(promotion -> promotion.getResult() == PromotionResult.DISCOUNT_RATE ||
                    promotion.getResult() == PromotionResult.DISCOUNT_AMOUNT)
                .map(Promotion::getName)
                .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}
