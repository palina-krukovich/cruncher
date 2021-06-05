package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.SupplierDTO;
import com.pk.cruncher.entity.ItemSupply;
import com.pk.cruncher.entity.Supplier;
import com.pk.cruncher.entity.Supply;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SupplierMapper implements BaseMapper<Supplier, SupplierDTO> {
    @Override
    public SupplierDTO toDto(Supplier entity) {
        return SupplierDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .address(entity.getAddress())
            .comment(entity.getComment())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .phoneNumber(entity.getPhoneNumber())
            .suppliesAmount(entity.getSupplies() == null ? 0 : getSuppliesAmount(entity.getSupplies()))
            .build();
    }

    private Long getSuppliesAmount(List<Supply> supplies) {
        double suppliesAmount = .0;
        for (Supply supply : supplies) {
            for (ItemSupply itemSupply : supply.getItemSupplies()) {
                suppliesAmount += itemSupply.getPricePerUnit() * itemSupply.getQuantity()
                    * (itemSupply.getPack() == null ? 1 : itemSupply.getPack().getUnitQuantity());
            }
        }
        return Math.round(suppliesAmount);
    }
}
