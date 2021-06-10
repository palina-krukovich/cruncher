package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.IngredientDTO;
import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.type.ItemType;
import com.pk.cruncher.entity.type.Unit;
import org.springframework.stereotype.Component;

import java.util.Comparator;

@Component
public class IngredientMapper implements BaseMapper<Item, IngredientDTO> {
    @Override
    public IngredientDTO toDto(Item entity) {
        return entity == null ? null : IngredientDTO.builder()
            .id(entity.getId())
            .type(entity.getType().toString())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .code(entity.getCode())
            .name(entity.getName())
            .barcode(entity.getBarcode())
            .unit(entity.getUnit() == null ? null : entity.getUnit().toString())
            .weightPerPiece(entity.getWeightPerPiece())
            .roundInventory(entity.getRoundInventory())
            .color(entity.getColor())
            .photoURL(entity.getPhotoURL())
            .lossClear(entity.getLossClear())
            .lossBoil(entity.getLossBoil())
            .lossFry(entity.getLossFry())
            .lossBake(entity.getLossBake())
            .lossStew(entity.getLossStew())
            .cost(Math.round(entity.getType() == ItemType.INGREDIENT
                ? getTotalCost(entity)
                : getTotalCost(entity) / getTotalWeight(entity)))
            .build();
    }

    private Double getTotalCost(Item item) {
        if (item.getType() == ItemType.INGREDIENT) {
            return item.getItemSupplies() == null ? 0L : item.getItemSupplies().stream()
                .max(Comparator.comparing(supply -> supply.getSupply().getSuppliedAt()))
                .map(supply -> supply.getPricePerUnit() / (supply.getPack() == null ? 1 : supply.getPack().getUnitQuantity()))
                .orElse(.0);
        }
        return item.getRecipeStructures().stream()
            .map(recipeIngredient -> getTotalCost(recipeIngredient.getIngredientItem()) * recipeIngredient.getGrossQuantity())
            .reduce(Double::sum).orElse(.0);
    }

    private Double getTotalWeight(Item item) {
        return item.getRecipeStructures()
            .stream()
            .map(ri -> ri.getIngredientItem().getType() == ItemType.PREPACK
                ? getTotalWeight(ri.getIngredientItem())
                : ri.getGrossQuantity() * (ri.getIngredientItem().getUnit() == Unit.PCS
                    ? ri.getIngredientItem().getWeightPerPiece()
                    : .1))
            .reduce(Double::sum)
            .orElse(.0);
    }
}
