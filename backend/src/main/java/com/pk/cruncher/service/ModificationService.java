package com.pk.cruncher.service;

import com.pk.cruncher.contoller.v1.request.ModificationRequest;
import com.pk.cruncher.contoller.v1.request.ModificationGroupRequest;
import com.pk.cruncher.entity.Item;
import com.pk.cruncher.entity.Modification;
import com.pk.cruncher.entity.ModificationGroup;
import com.pk.cruncher.entity.type.ModificationGroupType;
import com.pk.cruncher.repository.ModificationGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModificationService {
    private final ModificationGroupRepository modificationGroupRepository;
    private final IngredientService ingredientService;

    public ModificationService(ModificationGroupRepository modificationGroupRepository,
                               IngredientService ingredientService) {
        this.modificationGroupRepository = modificationGroupRepository;
        this.ingredientService = ingredientService;
    }

    public void create(ModificationGroupRequest request, Item item) {
        ModificationGroup modificationGroup = new ModificationGroup();
        fromRequest(request, modificationGroup);
        modificationGroup.setItem(item);
        List<Modification> modifications = request.getModifications().stream().map(mr -> {
            Modification modification = new Modification();
            fromRequest(mr, modification);
            modification.setModificationGroup(modificationGroup);
            return modification;
        }).collect(Collectors.toList());
        modificationGroup.setModifications(modifications);
        this.modificationGroupRepository.save(modificationGroup);
    }

    public void delete(Item item) {
        modificationGroupRepository.deleteAll(item.getModificationGroups());
    }

    private void fromRequest(ModificationGroupRequest request, ModificationGroup modificationGroup) {
        modificationGroup.setName(request.getName());
        modificationGroup.setType(ModificationGroupType.valueOf(request.getType()));
        modificationGroup.setMaxNum(request.getMaxNum());
        modificationGroup.setMinNum(request.getMinNum());
    }

    private void fromRequest(ModificationRequest request, Modification modification) {
        modification.setName(request.getName());
        modification.setWithoutWriteOff(request.getWithoutWriteOff());
        modification.setQuantity(request.getQuantity());
        modification.setPrice(request.getPrice());
        modification.setModificationItem(ingredientService.getIngredientForRecipeById(request.getIngredientId()));
    }
}
