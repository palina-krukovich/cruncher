package com.pk.cruncher.entity;

import com.pk.cruncher.entity.type.OrderStatus;
import com.pk.cruncher.entity.type.OrderType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity(name = "orders")
public class Order extends BaseEntity {

    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long receiptNumber;

    @ManyToOne
    @JoinColumn(name = "dining_table_id")
    private DiningTable diningTable;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private OrderStatus status;

    private OrderType type;

    private Long subtotal;

    private Double discountRate;

    private Long discountAmount;

    private Long totalPrice;

    private Long payedCash;

    private Long payedCard;

    private Long payedCashBack;

    private Long payedTotal;

    private OffsetDateTime openedAt;

    private OffsetDateTime closedAt;

    @OneToMany(mappedBy = "order")
    private List<OrderedItem> orderedItems;
}
