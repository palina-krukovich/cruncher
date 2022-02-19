import {Component, OnInit} from '@angular/core';
import {DateRange} from '../../common/navbar/navbar.component';
import {OrderApiService} from '../../../../api/order-api.service';
import {Order} from '../../../../model/order';
import {MatTableDataSource} from '@angular/material/table';

export interface OrderReport {
  date: Date;
  numberOfReceipts: number;
  inCash: number;
  byCard: number;
  total: number;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html'
})
export class PaymentsComponent implements OnInit {


  orders: Order[] = [];
  orderReports: OrderReport[] = [];
  dataSource = new MatTableDataSource<OrderReport>();

  displayedColumns = ['Date', 'Number of Receipts', 'In Cash', 'By Card', 'Total'];

  dateRange: DateRange = {
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  };

  constructor(private api: OrderApiService) {

  }

  ngOnInit(): void {
    this.api.getOrders().then(obs => obs.subscribe(orders => {
      this.orders = orders;
      this.updateDataSource();
      console.log(orders);
    }));
  }

  private updateDataSource(): void {
    const distinctDates = new Set(this.orders.map(order => new Date(order.createdAt).toDateString()));
    for (const date of distinctDates) {
      const ordersOnDate = this.orders.filter(order => new Date(order.createdAt).toDateString() === date);
      const numberOfReceipts = ordersOnDate.length;
      let inCash = 0;
      let byCard = 0;
      let total = 0;
      ordersOnDate.forEach(order => {
        inCash += order.payedCash;
        byCard += order.payedCard;
        total += order.payedTotal;
      });
      this.orderReports.push({date: new Date(date), numberOfReceipts, inCash, byCard, total});
    }
    this.orderReports = this.orderReports.sort((or1, or2) => or1.date < or2.date ? -1 : or1.date > or2.date ? 1 : 0).reverse();
    this.dataSource.data = this.orderReports;
  }

}
