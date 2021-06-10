package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.OrderDTO;
import com.pk.cruncher.entity.Order;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class OrderMapper implements BaseMapper<Order, OrderDTO> {
    private final OrderItemMapper orderItemMapper;
    private final EmployeeMapper employeeMapper;
    private final ClientMapper clientMapper;

    public OrderMapper(OrderItemMapper orderItemMapper, EmployeeMapper employeeMapper,
                       ClientMapper clientMapper) {
        this.orderItemMapper = orderItemMapper;
        this.employeeMapper = employeeMapper;
        this.clientMapper = clientMapper;
    }

    @Override
    public OrderDTO toDto(Order entity) {
        return OrderDTO.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .receiptNumber(entity.getReceiptNumber())
            .tableId(entity.getDiningTable() == null ? null : entity.getDiningTable().getId())
            .tableName(entity.getDiningTable() == null ? null : entity.getDiningTable().getName())
            .employee(entity.getEmployee() == null ? null : employeeMapper.toDto(entity.getEmployee()))
            .client(entity.getClient() == null ? null : clientMapper.toDto(entity.getClient()))
            .status(entity.getStatus().toString())
            .type(entity.getType().toString())
            .subtotal(entity.getSubtotal())
            .discountRate(entity.getDiscountRate())
            .discountAmount(entity.getDiscountAmount())
            .totalPrice(entity.getTotalPrice())
            .payedCard(entity.getPayedCard())
            .payedCash(entity.getPayedCash())
            .payedCashBack(entity.getPayedCashBack())
            .payedTotal(entity.getPayedTotal())
            .openedAt(entity.getOpenedAt())
            .closedAt(entity.getClosedAt())
            .items(entity.getOrderedItems() == null ? Collections.emptyList() : entity.getOrderedItems()
                .stream().map(orderItemMapper::toDto).collect(Collectors.toList()))
            .build();
    }
}
