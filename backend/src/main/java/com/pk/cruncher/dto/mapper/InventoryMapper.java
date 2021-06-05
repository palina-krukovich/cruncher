package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.InventoryDTO;
import com.pk.cruncher.entity.*;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.entity.type.Unit;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Component
public class InventoryMapper implements BaseMapper<Inventory, InventoryDTO> {

    private final ItemMapper itemMapper;

    public InventoryMapper(ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    @Override
    public InventoryDTO toDto(Inventory entity) {
        List<ItemSupply> allSupplies = entity.getItem().getItemSupplies();
        List<WriteOff> allWriteOffs = entity.getItem().getWriteOffs();
        List<Inventory> allInventories = entity.getItem().getInventories();

        Inventory lastInventory = getLastInventory(allInventories, entity).orElse(null);
        Inventory nextInventory = getNextInventory(allInventories, entity).orElse(null);

        Double initialQuantity = lastInventory == null ? 0 : lastInventory.getActualQuantity();
        Long initialValue = Math.round(initialQuantity * getLastSupplyCost(allSupplies, entity));

        Double supplyQuantity = getSupplyQuantity(allSupplies, lastInventory, nextInventory);
        Long supplyValue = getSupplyValue(allSupplies, lastInventory, nextInventory);
        Long avgCost = getLatestSupplyCost(allSupplies);

        Double wasteQuantity = getWasteQuantity(allWriteOffs, lastInventory, nextInventory);
        Long wasteValue = Math.round(avgCost * wasteQuantity);

        Double salesQuantity = getSalesQuantity(entity.getItem(), lastInventory, nextInventory);
        Long salesValue = Math.round(avgCost * salesQuantity);

        Double expectedQuantity = initialQuantity + supplyQuantity - wasteQuantity - salesQuantity;
        Long expectedValue = initialValue + supplyValue - wasteValue - salesValue;
        Double actualQuantity = entity.getActualQuantity();
        Long actualValue = Math.round(actualQuantity * avgCost);
        Double differenceQuantity = actualQuantity - expectedQuantity;
        Long differenceValue = actualValue - expectedValue;

        return InventoryDTO.builder()
            .id(entity.getId())
            .checkedAt(entity.getCheckedAt())
            .item(itemMapper.toDto(entity.getItem()))
            .initialQuantity(initialQuantity)
            .initialValue(initialValue)
            .supplyQuantity(supplyQuantity)
            .supplyValue(supplyValue)
            .wasteQuantity(wasteQuantity)
            .wasteValue(wasteValue)
            .salesQuantity(salesQuantity)
            .salesValue(salesValue)
            .expectedQuantity(expectedQuantity)
            .expectedValue(expectedValue)
            .actualQuantity(actualQuantity)
            .actualValue(actualValue)
            .differenceQuantity(differenceQuantity)
            .differenceValue(differenceValue)
            .build();
    }

    private Optional<Inventory> getLastInventory(List<Inventory> allInventories, Inventory currentInventory) {
        return allInventories.stream()
            .filter(inventory -> inventory.getCheckedAt().isBefore(currentInventory.getCheckedAt()))
            .max(Comparator.comparing(Inventory::getCheckedAt));
    }

    private Optional<Inventory> getNextInventory(List<Inventory> allInventories, Inventory currentInventory) {
        return allInventories.stream()
            .filter(inventory -> inventory.getCheckedAt().isAfter(currentInventory.getCheckedAt()))
            .min(Comparator.comparing(Inventory::getCheckedAt));
    }

    private Long getLastSupplyCost(List<ItemSupply> allSupplies, Inventory currentInventory) {
        return allSupplies.stream()
            .filter(supply -> supply.getSupply().getSuppliedAt().isBefore(currentInventory.getCheckedAt()))
            .max(Comparator.comparing(supply -> supply.getSupply().getSuppliedAt()))
            .map(supply -> supply.getPricePerUnit() / (supply.getPack() == null ? 1 : supply.getPack().getUnitQuantity()))
            .map(Math::round)
            .orElse(0L);
    }

    private Long getLatestSupplyCost(List<ItemSupply> allSupplies) {
        return allSupplies.stream()
            .max(Comparator.comparing(supply -> supply.getSupply().getSuppliedAt()))
            .map(supply -> supply.getPricePerUnit() / (supply.getPack() == null ? 1 : supply.getPack().getUnitQuantity()))
            .map(Math::round)
            .orElse(0L);
    }

    private Double getSupplyQuantity(List<ItemSupply> allSupplies, Inventory lastInventory, Inventory nextInventory) {
        return allSupplies.stream()
            .filter(supply -> lastInventory == null || supply.getSupply().getSuppliedAt().isAfter(lastInventory.getCheckedAt()))
            .filter(supply -> nextInventory == null || supply.getSupply().getSuppliedAt().isBefore(nextInventory.getCheckedAt()))
            .map(supply -> supply.getQuantity() * (supply.getPack() == null ? 1 : supply.getPack().getUnitQuantity()))
            .reduce(.0, Double::sum);
    }

    private Long getSupplyValue(List<ItemSupply> allSupplies, Inventory lastInventory, Inventory nextInventory) {
        return allSupplies.stream()
            .filter(supply -> lastInventory == null || supply.getSupply().getSuppliedAt().isAfter(lastInventory.getCheckedAt()))
            .filter(supply -> nextInventory == null || supply.getSupply().getSuppliedAt().isBefore(nextInventory.getCheckedAt()))
            .map(supply -> Math.round(supply.getQuantity() * supply.getPricePerUnit()))
            .reduce(0L, Long::sum);
    }

    private Double getWasteQuantity(List<WriteOff> allWriteOffs, Inventory lastInventory, Inventory nextInventory) {
        return allWriteOffs.stream()
            .filter(writeOff -> lastInventory == null || writeOff.getWrittenOffAt().isAfter(lastInventory.getCheckedAt()))
            .filter(writeOff -> nextInventory == null || writeOff.getWrittenOffAt().isBefore(nextInventory.getCheckedAt()))
            .map(WriteOff::getQuantity)
            .reduce(.0, Double::sum);
    }

    private Double getSalesQuantity(Item item, Inventory lastInventory, Inventory nextInventory) {
        if (item.getType() == ItemType.PRODUCT) {
            return item.getOrderedItems().stream()
                .filter(order -> lastInventory == null || order.getOrder().getClosedAt().isAfter(lastInventory.getCheckedAt()))
                .filter(order -> nextInventory == null || order.getOrder().getClosedAt().isBefore(nextInventory.getCheckedAt()))
                .map(order -> order.getQuantity() * 1.)
                .reduce(.0, Double::sum);
        } else {
            return getQuantityInDish(item, .0, ItemType.INGREDIENT, lastInventory, nextInventory);
        }
    }

    private Double getQuantityInDish(Item item, Double quantity, ItemType type, Inventory lastInv, Inventory nextInv) {
        if (item.getType() == ItemType.INGREDIENT) {
            return item.getRecipeIngredients().stream()
                .map(ri -> getQuantityInDish(ri.getStructureItem(), ri.getGrossQuantity(), ItemType.INGREDIENT, lastInv, nextInv))
                .reduce(.0, Double::sum);
        }
        if (item.getType() == ItemType.PREPACK) {
            Double weight = getTotalWeight(item);
            return item.getRecipeIngredients().stream()
                .map(ri -> getQuantityInDish(ri.getStructureItem(), type == ItemType.INGREDIENT ? quantity / weight : quantity * weight,
                    ItemType.PREPACK, lastInv, nextInv))
                .reduce(.0, Double::sum);
        }
        if (item.getType() == ItemType.DISH) {
            Double weight = getTotalWeight(item);
            Long orderCount = item.getOrderedItems().stream()
                .filter(order -> lastInv == null || order.getOrder().getClosedAt().isAfter(lastInv.getCheckedAt()))
                .filter(order -> nextInv == null || order.getOrder().getClosedAt().isBefore(nextInv.getCheckedAt()))
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
