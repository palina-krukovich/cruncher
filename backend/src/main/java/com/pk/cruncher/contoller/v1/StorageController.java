package com.pk.cruncher.contoller.v1;

import com.pk.cruncher.contoller.v1.request.*;
import com.pk.cruncher.dto.*;
import com.pk.cruncher.service.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("storage/")
public class StorageController {
    private final PackService packService;
    private final SupplierService supplierService;
    private final SupplyService supplyService;
    private final WriteOffService writeOffService;
    private final InventoryService inventoryService;

    public StorageController(PackService packService, SupplierService supplierService,
                             SupplyService supplyService, WriteOffService writeOffService,
                             InventoryService inventoryService) {
        this.packService = packService;
        this.supplierService = supplierService;
        this.supplyService = supplyService;
        this.writeOffService = writeOffService;
        this.inventoryService = inventoryService;
    }

    @GetMapping("getPacks")
    public List<PackDTO> getPacks() {
        return packService.getAll();
    }

    @GetMapping("getPack")
    public PackDTO getPack(@RequestParam @NotNull UUID id) {
        return packService.getById(id);
    }

    @PostMapping("createPack")
    public void createPack(@RequestBody @NotNull PackRequest request) {
        packService.create(request);
    }

    @PutMapping("updatePack")
    public void updatePack(@RequestBody @NotNull PackRequest request) {
        packService.update(request);
    }

    @DeleteMapping("deletePack")
    public void deletePack(@RequestParam @NotNull UUID id) {
        packService.delete(id);
    }



    @GetMapping("getSuppliers")
    public List<SupplierDTO> getSuppliers() {
        return supplierService.getAll();
    }

    @GetMapping("getSupplier")
    public SupplierDTO getSupplier(@RequestParam @NotNull UUID id) {
        return supplierService.getById(id);
    }

    @PostMapping("createSupplier")
    public void createSupplier(@RequestBody @NotNull SupplierRequest request) {
        supplierService.create(request);
    }

    @PutMapping("updateSupplier")
    public void updateSupplier(@RequestBody @NotNull SupplierRequest request) {
        supplierService.update(request);
    }

    @DeleteMapping("deleteSupplier")
    public void deleteSupplier(@RequestParam @NotNull UUID id) {
        supplierService.delete(id);
    }



    @GetMapping("getSupplies")
    public List<SupplyDTO> getSupplies() {
        return supplyService.getAll();
    }

    @GetMapping("getSupply")
    public SupplyDTO getSupply(@RequestParam @NotNull UUID id) {
        return supplyService.getById(id);
    }

    @GetMapping("getSuppliedItems")
    public List<ItemDTO> getSuppliedItems() {
        return supplyService.getSuppliedItems();
    }

    @PostMapping("createSupply")
    public void createSupply(@RequestBody @NotNull SupplyRequest request) {
        supplyService.create(request);
    }

    @PutMapping("updateSupply")
    public void updateSupply(@RequestBody @NotNull SupplyRequest request) {
        supplyService.update(request);
    }

    @DeleteMapping("deleteSupply")
    public void deleteSupply(@RequestParam @NotNull UUID id) {
        supplyService.delete(id);
    }


    @GetMapping("getWriteOffs")
    public List<WriteOffDTO> getWriteOffs() {
        return writeOffService.getAll();
    }

    @GetMapping("getWriteOff")
    public WriteOffDTO getWriteOff(@RequestParam @NotNull UUID id) {
        return writeOffService.getById(id);
    }

    @GetMapping("getWriteOffReasons")
    public List<WriteOffReasonDTO> getWriteOffReasons() {
        return writeOffService.getWriteOffReasons();
    }

    @PostMapping("createWriteOff")
    public void createWriteOff(@RequestBody @NotNull WriteOffRequest request) {
        writeOffService.create(request);
    }

    @PostMapping("createWriteOffReason")
    public WriteOffReasonDTO createWriteOffReason(@RequestBody @NotNull WriteOffReasonRequest request) {
        return writeOffService.createWriteOffReason(request);
    }

    @PutMapping("updateWriteOff")
    public void updateWriteOff(@RequestBody @NotNull WriteOffRequest request) {
        writeOffService.update(request);
    }

    @DeleteMapping("deleteWriteOff")
    public void deleteWriteOff(@RequestParam @NotNull UUID id) {
        writeOffService.delete(id);
    }



    @GetMapping("getInventories")
    public List<InventoryDTO> getInventories() {
        return inventoryService.getAll();
    }

    @GetMapping("getStock")
    public List<StockDTO> getStock() {
        return inventoryService.getStock();
    }

    @GetMapping("getInventory")
    public InventoryDTO getInventory(@RequestParam @NotNull UUID id) {
        return inventoryService.getById(id);
    }

    @GetMapping("getInventoriesByCheckedAt")
    public List<InventoryDTO> getInventoriesByCheckedAt(@RequestParam @NotNull String checkedAt) {
        return inventoryService.getByCheckedAt(OffsetDateTime.parse(checkedAt));
    }

    @PostMapping("createInventories")
    public void createInventories(@RequestBody @NotNull List<InventoryRequest> requests) {
        inventoryService.create(requests);
    }

    @PutMapping("updateInventories")
    public void updateInventories(@RequestBody @NotNull List<InventoryRequest> requests) {
        inventoryService.update(requests);
    }

    @DeleteMapping("deleteInventories")
    public void deleteInventories(@RequestParam @NotNull List<UUID> ids) {
        inventoryService.delete(ids);
    }
}
