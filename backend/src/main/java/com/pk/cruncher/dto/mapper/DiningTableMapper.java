package com.pk.cruncher.dto.mapper;

import com.pk.cruncher.dto.DiningTableDTO;
import com.pk.cruncher.entity.DiningTable;
import com.pk.cruncher.entity.type.OrderStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class DiningTableMapper implements BaseMapper<DiningTable, DiningTableDTO> {
    @Override
    public DiningTableDTO toDto(DiningTable entity) {
        return DiningTableDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .capacity(entity.getCapacity())
            .width(entity.getWidth())
            .height(entity.getHeight())
            .x(entity.getX())
            .y(entity.getY())
            .shape(entity.getShape().toString())
            .hasActiveOrders(entity.getOrders() != null && entity.getOrders().stream().anyMatch(order -> order.getStatus() == OrderStatus.NEW))
            .orders(getActiveOrders(entity))
            .build();
    }

//    private Optional<Reservation> getUpcomingReservation(List<Reservation> reservations) {
//        return reservations.stream()
//            .filter(reservation -> !reservation.getCanceled() && reservation.getStartsAt().isAfter(OffsetDateTime.now()))
//            .min(Comparator.comparing(Reservation::getStartsAt));
//    }

    private List<DiningTableDTO.TableOrder> getActiveOrders(DiningTable table) {
        return table.getOrders() == null ? null : table.getOrders().stream()
            .filter(order -> order.getStatus() == OrderStatus.NEW)
            .map(order -> new DiningTableDTO.TableOrder(order.getId(), order.getReceiptNumber()))
            .collect(Collectors.toList());
    }
}
