import {Component, OnInit} from '@angular/core';
import {OrderApiService} from '../../../../api/order-api.service';
import {HallApiService} from '../../../../api/hall-api.service';
import {Order} from '../../../../model/order';
import {Hall} from '../../../../model/hall';
import {MatTableDataSource} from '@angular/material/table';

export interface HallReport {
  hallId: string;
  hallName: string;
  revenue: number;
  receipts: number;
  averageReceipt: number;
  dataSource: MatTableDataSource<TableReport>;
  tableReports: TableReport[];
}

export interface TableReport {
  tableId: string;
  tableName: string;
  revenue: number;
  receipts: number;
  averageReceipt: number;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {

  orders: Order[] = [];
  halls: Hall[] = [];
  hallReports: HallReport[] = [];
  displayedColumns = ['Table Name', 'Revenue', 'Receipts', 'Average Receipt'];

  constructor(private api: OrderApiService,
              private hallApi: HallApiService) {
  }

  ngOnInit(): void {
    this.api.getOrders().then(obs => obs.subscribe(orders => {
      this.orders = orders;
      this.hallApi.getHalls().then(o => o.subscribe(halls => {
        this.halls = halls;
        this.init();
      }));
    }));
  }

  private init(): void {
    this.halls.forEach(hall => {
      const tableReports: TableReport[] = hall.tables.map(table => {
        const tableOrders = this.orders.filter(order => order.tableId === table.id);
        const revenue = tableOrders.map(order => order.totalPrice).reduce((a, b) => a + b, 0);
        const receipts = tableOrders.length;
        const averageReceipt = Math.round(revenue / receipts) || 0;
        return {
          tableId: table.id,
          tableName: table.name,
          revenue: revenue / 100,
          receipts,
          averageReceipt: averageReceipt / 100
        };
      });
      const hallRevenue = tableReports.map(tableReport => tableReport.revenue).reduce((a, b) => a + b, 0);
      const hallReceipts = tableReports.map(tableReport => tableReport.receipts).reduce((a, b) => a + b, 0);
      const hallReport: HallReport = {
        hallId: hall.id,
        hallName: hall.name,
        revenue: hallRevenue,
        receipts: hallReceipts,
        averageReceipt: (Math.round((hallRevenue / hallReceipts) * 100) / 100) || 0,
        dataSource: new MatTableDataSource<TableReport>(tableReports),
        tableReports
      };
      this.hallReports.push(hallReport);
    });
  }

  round(n: number): number {
    return Math.round(n);
  }

}
