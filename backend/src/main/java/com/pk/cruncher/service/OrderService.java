package com.pk.cruncher.service;

import com.pk.cruncher.config.User;
import com.pk.cruncher.contoller.v1.request.OrderCreateRequest;
import com.pk.cruncher.contoller.v1.request.OrderItemRequest;
import com.pk.cruncher.dto.MenuCategoryDTO;
import com.pk.cruncher.dto.MenuItemDTO;
import com.pk.cruncher.dto.OrderDTO;
import com.pk.cruncher.dto.OrderItemDTO;
import com.pk.cruncher.dto.mapper.MenuCategoryMapper;
import com.pk.cruncher.dto.mapper.MenuItemMapper;
import com.pk.cruncher.dto.mapper.OrderItemMapper;
import com.pk.cruncher.dto.mapper.OrderMapper;
import com.pk.cruncher.entity.*;
import com.pk.cruncher.entity.type.*;
import com.pk.cruncher.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final DiningTableRepository diningTableRepository;
    private final EmployeeRepository employeeRepository;
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final MenuItemMapper menuItemMapper;
    private final MenuCategoryMapper menuCategoryMapper;
    private final OrderedItemRepository orderedItemRepository;
    private final ModificationRepository modificationRepository;
    private final OrderItemMapper orderItemMapper;

    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper,
                        DiningTableRepository diningTableRepository, EmployeeRepository employeeRepository,
                        ItemRepository itemRepository, CategoryRepository categoryRepository,
                        MenuItemMapper menuItemMapper, MenuCategoryMapper menuCategoryMapper,
                        OrderedItemRepository orderedItemRepository, ModificationRepository modificationRepository,
                        OrderItemMapper orderItemMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.diningTableRepository = diningTableRepository;
        this.employeeRepository = employeeRepository;
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
        this.menuItemMapper = menuItemMapper;
        this.menuCategoryMapper = menuCategoryMapper;
        this.orderedItemRepository = orderedItemRepository;
        this.modificationRepository = modificationRepository;
        this.orderItemMapper = orderItemMapper;
    }

    public List<OrderDTO> getAll() {
        return orderRepository.findAll().stream().map(orderMapper::toDto).collect(Collectors.toList());
    }

    public OrderDTO getById(UUID id) {
        return orderRepository.findById(id).map(orderMapper::toDto).orElseThrow();
    }

    public List<OrderItemDTO> getAllOrderItems() {
        return orderedItemRepository.findAll().stream().map(orderItemMapper::toDto).collect(Collectors.toList());
    }

    public OrderDTO create(OrderCreateRequest request) {
        Order order = new Order();
        order.setCreatedAt(OffsetDateTime.now());
        order.setUpdatedAt(OffsetDateTime.now());
        order.setReceiptNumber(orderRepository.findMaxReceiptNumber().map(n -> n + 1L).orElse(1L));
        order.setDiningTable(diningTableRepository.findById(request.getTableId()).orElseThrow());
        order.setEmployee(getCurrentEmployee().orElse(null));
        order.setStatus(OrderStatus.NEW);
        order.setType(OrderType.valueOf(request.getType()));
        order.setSubtotal(0L);
        order.setDiscountRate(.0);
        order.setDiscountAmount(0L);
        order.setTotalPrice(0L);
        order.setPayedCard(0L);
        order.setPayedCash(0L);
        order.setPayedCashBack(0L);
        order.setPayedTotal(0L);
        order.setOpenedAt(OffsetDateTime.now());
        return orderMapper.toDto(orderRepository.save(order));
    }

    public List<MenuCategoryDTO> getMenuCategories() {
        return categoryRepository.findAllByParentCategoryIsNullAndDeletedIsFalse().stream()
            .map(menuCategoryMapper::toDto).collect(Collectors.toList());
    }

    public List<MenuItemDTO> getMenuItems() {
        return itemRepository.findAllByDeletedIsFalseAndTypeInAndCategoryIsNull(List.of(ItemType.DISH, ItemType.PRODUCT))
            .stream().map(menuItemMapper::toDto).collect(Collectors.toList());
    }

    public OrderDTO createOrderItem(OrderItemRequest request) {
        OrderedItem orderedItem = new OrderedItem();
        Item item = itemRepository.findById(request.getItemId()).orElseThrow();
        List<Modification> modifications = request.getModificationIds() == null || request.getModificationIds().size() == 0
            ? Collections.emptyList()
            : modificationRepository.findAllById(request.getModificationIds());
        orderedItem.setOrder(orderRepository.findById(request.getOrderId()).orElseThrow());
        orderedItem.setCreatedAt(OffsetDateTime.now());
        orderedItem.setUpdatedAt(OffsetDateTime.now());
        orderedItem.setItem(item);
        orderedItem.setModifications(modifications);
        orderedItem.setQuantity(request.getQuantity());
        orderedItem.setPricePerItem(item.getPrice() + modifications.stream().map(Modification::getPrice).reduce(0L, Long::sum));
        orderedItem.setSubtotal(request.getQuantity() * orderedItem.getPricePerItem());
        if (item.getPromotionConditions() != null) {
            Double discountRate = item.getPromotionConditions().stream()
                .map(PromotionCondition::getPromotion)
                .filter(promotion -> promotion.getResult() == PromotionResult.DISCOUNT_RATE)
                .map(Promotion::getDiscountValue)
                .max(Comparator.naturalOrder())
                .orElse(.0);
            orderedItem.setDiscountRate(discountRate);
            Long discountAmount = item.getPromotionConditions().stream()
                .map(PromotionCondition::getPromotion)
                .filter(promotion -> promotion.getResult() == PromotionResult.DISCOUNT_AMOUNT)
                .map(Promotion::getDiscountValue)
                .max(Comparator.naturalOrder())
                .map(Math::round)
                .orElse(0L);
            Long totalDiscount = Math.round((orderedItem.getSubtotal() - discountAmount) * discountRate / 100);
            orderedItem.setDiscountAmount(totalDiscount);
        } else {
            orderedItem.setDiscountRate(.0);
            orderedItem.setDiscountAmount(0L);
        }
        orderedItem.setTotalPrice(orderedItem.getSubtotal() - orderedItem.getDiscountAmount());
        orderedItem.setStatus(OrderedItemStatus.NEW);
        orderedItemRepository.save(orderedItem);

        Order order = orderRepository.findById(request.getOrderId()).orElseThrow();
        order.setSubtotal(order.getOrderedItems().stream().map(OrderedItem::getTotalPrice).reduce(0L, Long::sum));
        order.setDiscountAmount(Math.round(order.getSubtotal() * order.getDiscountRate() / 100));
        order.setTotalPrice(order.getSubtotal() - order.getDiscountAmount());
        order.setUpdatedAt(OffsetDateTime.now());

        return orderMapper.toDto(orderRepository.save(order));
    }

    public OrderDTO updateOrderItemQuantity(UUID orderItemId, Long quantity) {
        OrderedItem orderedItem = orderedItemRepository.findById(orderItemId).orElseThrow();
        UUID orderId = orderedItem.getOrder().getId();
        if (quantity == 0) {
            orderedItemRepository.deleteById(orderItemId);
        } else {
            orderedItem.setQuantity(quantity);
            orderedItem.setSubtotal(orderedItem.getPricePerItem() * orderedItem.getQuantity());
            if (orderedItem.getItem().getPromotionConditions() != null) {
                Long discountAmount = orderedItem.getItem().getPromotionConditions().stream()
                    .map(PromotionCondition::getPromotion)
                    .filter(promotion -> promotion.getResult() == PromotionResult.DISCOUNT_AMOUNT)
                    .map(Promotion::getDiscountValue)
                    .max(Comparator.naturalOrder())
                    .map(Math::round)
                    .orElse(0L);
                Long totalDiscount = Math.round((orderedItem.getSubtotal() - discountAmount) * orderedItem.getDiscountRate() / 100);
                orderedItem.setDiscountAmount(totalDiscount);
            }
            orderedItem.setTotalPrice(orderedItem.getSubtotal() - orderedItem.getDiscountAmount());
            orderedItemRepository.save(orderedItem);
        }
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setUpdatedAt(OffsetDateTime.now());
        order.setSubtotal(order.getOrderedItems().stream().map(OrderedItem::getTotalPrice).reduce(0L, Long::sum));
        order.setDiscountAmount(Math.round(order.getSubtotal() * order.getDiscountRate() / 100));
        order.setTotalPrice(order.getSubtotal() - order.getDiscountAmount());
        return orderMapper.toDto(orderRepository.save(order));
    }

    public OrderDTO closeOrder(UUID orderId, Long payedCash, Long payedCard) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setPayedCash(payedCash);
        order.setPayedCard(payedCard);
        order.setPayedCashBack(0L);
        order.setPayedTotal(payedCard + payedCash);
        order.setStatus(OrderStatus.CLOSED);
        order.setClosedAt(OffsetDateTime.now());
        return orderMapper.toDto(orderRepository.save(order));
    }

    private Optional<Employee> getCurrentEmployee() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return employeeRepository.findByUid(user.getUid());
    }

}
