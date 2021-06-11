package com.pk.cruncher.contoller.v1;


import com.pk.cruncher.contoller.v1.request.HallRequest;
import com.pk.cruncher.contoller.v1.request.OrderCreateRequest;
import com.pk.cruncher.contoller.v1.request.OrderItemRequest;
import com.pk.cruncher.dto.*;
import com.pk.cruncher.service.HallService;
import com.pk.cruncher.service.OrderService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("pos/")
public class PosController {
    private final HallService hallService;
    private final OrderService orderService;

    public PosController(HallService hallService, OrderService orderService) {
        this.hallService = hallService;
        this.orderService = orderService;
    }

    @GetMapping("getHalls")
    public List<HallDTO> getHalls() {
        return hallService.getAll();
    }

    @GetMapping("getHall")
    public HallDTO getPack(@RequestParam @NotNull UUID id) {
        return hallService.getById(id);
    }

    @PostMapping("createHall")
    public void createPack(@RequestBody @NotNull HallRequest request) {
        hallService.create(request);
    }

    @PutMapping("updateHall")
    public void updatePack(@RequestBody @NotNull HallRequest request) {
        hallService.update(request);
    }

    @DeleteMapping("deleteHall")
    public void deletePack(@RequestParam @NotNull UUID id) {
        hallService.delete(id);
    }


    @GetMapping("getOrders")
    public List<OrderDTO> getOrders() {
        return orderService.getAll();
    }

    @GetMapping("getOrder")
    public OrderDTO getOrder(@RequestParam @NotNull UUID id) {
        return orderService.getById(id);
    }

    @GetMapping("getOrderItems")
    public List<OrderItemDTO> getOrderItems() {
        return orderService.getAllOrderItems();
    }

    @PostMapping("createOrder")
    public OrderDTO createOrder(@RequestBody @NotNull OrderCreateRequest request) {
        return orderService.create(request);
    }

    @GetMapping("getMenuItems")
    public List<MenuItemDTO> getMenuItems() {
        return orderService.getMenuItems();
    }


    @GetMapping("getMenuCategories")
    public List<MenuCategoryDTO> getMenuCategories() {
        return orderService.getMenuCategories();
    }

    @PostMapping("createOrderItem")
    public OrderDTO createOrderItem(@RequestBody @NotNull OrderItemRequest request) {
        return orderService.createOrderItem(request);
    }

    @PostMapping("updateOrderItemQuantity")
    public OrderDTO updateOrderItemQuantity(@RequestParam @NotNull UUID id, @RequestParam @NotNull Long quantity) {
        return orderService.updateOrderItemQuantity(id, quantity);
    }

    @PostMapping("closeOrder")
    public OrderDTO closeOrder(@RequestParam @NotNull UUID orderId, @RequestParam @NotNull Long payedCash, @RequestParam @NotNull Long payedCard) {
        return orderService.closeOrder(orderId, payedCash, payedCard);
    }

    @PostMapping("cancelOrder")
    public OrderDTO cancelOrder(@RequestParam @NotNull UUID orderId) {
        return orderService.cancelOrder(orderId);
    }

    @PostMapping("sendToKitchen")
    public OrderDTO sendToKitchen(@RequestParam @NotNull UUID orderId) {
        return orderService.sendToKitchen(orderId);
    }

    @GetMapping("getKitchenOrders")
    public List<OrderDTO> getKitchenOrders() {
        return orderService.getKitchenOrders();
    }


    @GetMapping("updateOrderedItemStatus")
    public List<OrderDTO> updateOrderedItemStatus(@RequestParam @NotNull UUID orderItemId, @RequestParam @NotNull String status) {
        return orderService.updateOrderedItemStatus(orderItemId, status);
    }
}
