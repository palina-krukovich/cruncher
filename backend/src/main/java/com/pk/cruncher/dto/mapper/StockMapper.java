package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.StockDTO;
import com.pk.cruncher.entity.*;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.entity.type.Unit;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Component
public class StockMapper implements BaseMapper<Item, StockDTO> {

    @Override
    public StockDTO toDto(Item entity) {
        Long value = getLatestSupplyCost(entity.getItemSupplies());
        Double quantity = getItemQuantity(entity);
        Long sum = Math.round(quantity * value);
        return StockDTO.builder()
            .itemName(entity.getName())
            .itemType(entity.getType().toString())
            .itemUnit(entity.getType() == ItemType.PRODUCT ? Unit.PCS.toString() : entity.getUnit().toString())
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .categoryName(entity.getCategory() == null ? null : entity.getCategory().getName())
            .quantity(quantity)
            .value(value)
            .sum(sum)
            .build();
    }

    private Double getItemQuantity(Item item) {
        Optional<Inventory> latestInventory = item.getInventories().stream()
            .max(Comparator.comparing(Inventory::getCheckedAt));
        Double initialQuantity = latestInventory.map(Inventory::getActualQuantity).orElse(.0);
        Double supplyQuantity = item.getItemSupplies().stream()
            .filter(itemSupply -> latestInventory.isEmpty() || itemSupply.getSupply().getSuppliedAt().isAfter(latestInventory.get().getCheckedAt()))
            .map(itemSupply -> itemSupply.getQuantity() / (itemSupply.getPack() == null ? 1 : itemSupply.getPack().getUnitQuantity()))
            .reduce(.0, Double::sum);
        Double wasteQuantity = item.getWriteOffs().stream()
            .filter(writeOff -> latestInventory.isEmpty() || writeOff.getWrittenOffAt().isAfter(latestInventory.get().getCheckedAt()))
            .map(WriteOff::getQuantity)
            .reduce(.0, Double::sum);
        Double salesQuantity = getSalesQuantity(item, latestInventory.orElse(null));
        return initialQuantity + supplyQuantity - wasteQuantity - salesQuantity;
    }

    private Long getLatestSupplyCost(List<ItemSupply> allSupplies) {
        return allSupplies.stream()
            .max(Comparator.comparing(supply -> supply.getSupply().getSuppliedAt()))
            .map(supply -> supply.getPricePerUnit() / (supply.getPack() == null ? 1 : supply.getPack().getUnitQuantity()))
            .map(Math::round)
            .orElse(0L);
    }

    private Double getSalesQuantity(Item item, Inventory lastInventory) {
        if (item.getType() == ItemType.PRODUCT) {
            return item.getOrderedItems().stream()
                .filter(order -> lastInventory == null || order.getOrder().getClosedAt().isAfter(lastInventory.getCheckedAt()))
                .map(order -> order.getQuantity() * 1.)
                .reduce(.0, Double::sum);
        } else {
            return getQuantityInDish(item, .0, ItemType.INGREDIENT, lastInventory);
        }
    }

    private Double getQuantityInDish(Item item, Double quantity, ItemType type, Inventory lastInv) {
        if (item.getType() == ItemType.INGREDIENT) {
            return item.getRecipeIngredients().stream()
                .map(ri -> getQuantityInDish(ri.getStructureItem(), ri.getGrossQuantity(), ItemType.INGREDIENT, lastInv))
                .reduce(.0, Double::sum);
        }
        if (item.getType() == ItemType.PREPACK) {
            Double weight = getTotalWeight(item);
            return item.getRecipeIngredients().stream()
                .map(ri -> getQuantityInDish(ri.getStructureItem(), type == ItemType.INGREDIENT ? quantity / weight : quantity * weight,
                    ItemType.PREPACK, lastInv))
                .reduce(.0, Double::sum);
        }
        if (item.getType() == ItemType.DISH) {
            Double weight = getTotalWeight(item);
            Long orderCount = item.getOrderedItems() == null ? 0 : item.getOrderedItems().stream()
                .filter(order -> lastInv == null || order.getOrder().getClosedAt().isAfter(lastInv.getCheckedAt()))
                .map(OrderedItem::getQuantity)
                .reduce(0L, Long::sum);
            return type == ItemType.INGREDIENT ? quantity * orderCount : quantity * weight * orderCount;
        }
        return .0;
    }

    private Double getTotalWeight(Item item) {
        return item.getRecipeStructures().stream()
            .map(recipeIngredient -> recipeIngredient.getGrossQuantity() *
                (recipeIngredient.getIngredientItem().getType() == ItemType.INGREDIENT &&
                    recipeIngredient.getIngredientItem().getUnit() == Unit.PCS
                    ? recipeIngredient.getIngredientItem().getWeightPerPiece() : .1))
            .reduce(.0, Double::sum);
    }
}
