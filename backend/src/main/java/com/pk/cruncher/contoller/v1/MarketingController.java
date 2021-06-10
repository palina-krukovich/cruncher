package com.pk.cruncher.contoller.v1;


import com.pk.cruncher.contoller.v1.request.ClientGroupRequest;
import com.pk.cruncher.contoller.v1.request.ClientRequest;
import com.pk.cruncher.contoller.v1.request.LoyaltyRuleRequest;
import com.pk.cruncher.contoller.v1.request.PromotionRequest;
import com.pk.cruncher.dto.*;
import com.pk.cruncher.service.ClientGroupService;
import com.pk.cruncher.service.ClientService;
import com.pk.cruncher.service.LoyaltyRuleService;
import com.pk.cruncher.service.PromotionService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("marketing/")
public class MarketingController {

    private final ClientService clientService;
    private final ClientGroupService clientGroupService;
    private final LoyaltyRuleService loyaltyRuleService;
    private final PromotionService promotionService;

    public MarketingController(ClientService clientService, ClientGroupService clientGroupService,
                               LoyaltyRuleService loyaltyRuleService, PromotionService promotionService) {
        this.clientService = clientService;
        this.clientGroupService = clientGroupService;
        this.loyaltyRuleService = loyaltyRuleService;
        this.promotionService = promotionService;
    }

    @GetMapping("getClientGroups")
    public List<ClientGroupDTO> getClientGroups() {
        return clientGroupService.getAll();
    }

    @GetMapping("getClientGroup")
    public ClientGroupDTO getClientGroup(@RequestParam @NotNull UUID id) {
        return clientGroupService.getById(id);
    }

    @GetMapping("getDeletedClientGroups")
    public List<ClientGroupDTO> getDeletedClientGroups() {
        return clientGroupService.getDeleted();
    }

    @PostMapping("createClientGroup")
    public void createClientGroup(@RequestBody @NotNull ClientGroupRequest request) {
        clientGroupService.create(request);
    }

    @PutMapping("updateClientGroup")
    public void updateClientGroup(@RequestBody @NotNull ClientGroupRequest request) {
        clientGroupService.update(request);
    }

    @DeleteMapping("deleteClientGroup")
    public void deleteClientGroup(@RequestParam @NotNull UUID id) {
        clientGroupService.delete(id);
    }

    @PutMapping("recoverClientGroup")
    public ClientGroupDTO recoverClientGroup(@RequestParam @NotNull UUID id) {
        return clientGroupService.recover(id);
    }



    @GetMapping("getClients")
    public List<ClientDTO> getClients() {
        return clientService.getAll();
    }

    @GetMapping("getClient")
    public ClientDTO getClient(@RequestParam @NotNull UUID id) {
        return clientService.getById(id);
    }

    @GetMapping("getDeletedClients")
    public List<ClientDTO> getDeletedClients() {
        return clientService.getDeleted();
    }

    @PostMapping("createClient")
    public void createClient(@RequestBody @NotNull ClientRequest request) {
        clientService.create(request);
    }

    @PutMapping("updateClient")
    public void updateClient(@RequestBody @NotNull ClientRequest request) {
        clientService.update(request);
    }

    @DeleteMapping("deleteClient")
    public void deleteClient(@RequestParam @NotNull UUID id) {
        clientService.delete(id);
    }

    @PutMapping("recoverClient")
    public ClientDTO recoverClient(@RequestParam @NotNull UUID id) {
        return clientService.recover(id);
    }



    @GetMapping("getLoyaltyRules")
    public List<LoyaltyRuleDTO> getLoyaltyRules() {
        return loyaltyRuleService.getAll();
    }

    @GetMapping("getLoyaltyRule")
    public LoyaltyRuleDTO getLoyaltyRule(@RequestParam @NotNull UUID id) {
        return loyaltyRuleService.getById(id);
    }

    @PostMapping("updateLoyaltyRules")
    public List<LoyaltyRuleDTO> updateLoyaltyRules(@RequestBody @NotNull List<LoyaltyRuleRequest> requests) {
        return loyaltyRuleService.updateLoyaltyRules(requests);
    }



    @GetMapping("getPromotions")
    public List<PromotionDTO> getPromotions() {
        return promotionService.getAll();
    }

    @GetMapping("getPromotion")
    public PromotionDTO getPromotion(@RequestParam @NotNull UUID id) {
        return promotionService.getById(id);
    }

    @GetMapping("getPromotionCategories")
    public List<CategoryDTO> getPromotionCategories() {
        return promotionService.getPromotionCategories();
    }

    @GetMapping("getPromotionItems")
    public List<ItemDTO> getPromotionItems() {
        return promotionService.getPromotionItems();
    }

    @PostMapping("createPromotion")
    public void createPromotion(@RequestBody @NotNull PromotionRequest request) {
        promotionService.create(request);
    }

    @PutMapping("updatePromotion")
    public void updatePromotion(@RequestBody @NotNull PromotionRequest request) {
        promotionService.update(request);
    }

    @DeleteMapping("deletePromotion")
    public void deletePromotion(@RequestParam @NotNull UUID id) {
        promotionService.delete(id);
    }



}
