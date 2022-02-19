import {Component, OnInit} from '@angular/core';
import {OrderApiService} from '../../../../api/order-api.service';
import {Order} from '../../../../model/order';
import {ClientApiService} from '../../../../api/client-api.service';
import {Client} from '../../../../model/client';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {OrderItem} from '../../../../model/order-item';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  orders: Order[] = [];
  orderItems: OrderItem[] = [];
  clients: Client[] = [];
  todayStr = new Date().toDateString();
  yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

  todayRevenue = 0;
  revenueRate = 0;
  todayProfit = 0;
  profitRate = 0;
  todayReceiptsCount = 0;
  receiptsCountRate = 0;
  todayClientsCount = 0;
  clientsCountRate = 0;
  todayAverageReceipt = 0;
  averageReceiptRate = 0;

  revenueChartLabels: Label[] = [];
  revenueChartData: ChartDataSets[] = [{data: [], label: 'Revenue'}];

  paymentMethodsCharLabels: Label[] = ['By Card', 'In Cash'];
  paymentMethodsChartData: number[] = [];

  orderTypesChartLabels: Label[] = ['Takeout', 'Dine-in'];
  orderTypesChartData: number[] = [];

  salesByDayOfWeekChartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  salesByDayOfWeekChartData: ChartDataSets[] = [{data: [], label: 'Sales'}];

  popularItemsChartLabels: Label[] = [];
  popularItemsChartData: ChartDataSets[] = [{data: [], label: 'Popular Item'}];

  chartOptions: ChartOptions = {responsive: true, maintainAspectRatio: false, legend: {position: 'bottom', fullWidth: true}};
  chartColorsOne: Color[] = [{borderColor: '#4F2A9D', backgroundColor: '#673AB730'}];
  chartColorsTwo: Color[] = [{borderColor: ['#FF8F00', '#4F2A9D'], backgroundColor: ['#FFC10730', '#673AB730']}];


  constructor(private api: OrderApiService,
              private clientApi: ClientApiService) {
  }

  ngOnInit(): void {
    this.api.getOrders().then(obs => obs.subscribe(orders => {
      this.orders = orders;
      this.initOrderValues();
    }));
    this.api.getOrderItems().then(obs => obs.subscribe(orderItems => {
      this.orderItems = orderItems;
      this.initOrderItemValues();
    }));
    this.clientApi.getClients().then(obs => obs.subscribe(clients => {
      this.clients = clients;
      this.initClientValues();
    }));
  }

  receiptsCount = (orders: Order[]): number => orders.length;
  revenue = (orders: Order[]): number => orders.reduce((acc, val) => acc + val.payedTotal, 0);
  averageReceipt = (revenue: number, receiptsCount: number): number => Math.round(revenue / receiptsCount) || 0;
  clientsCount = (clients: Client[]): number => clients.length;

  get todayValues(): { value: number; label: string, percent: number; displayCurrency: boolean }[] {
    return [
      {value: Math.round(this.todayRevenue) / 100, label: 'Revenue', percent: Math.round(this.revenueRate * 100) / 100, displayCurrency: true},
      {value: Math.round(this.todayProfit) / 100, label: 'Profit', percent: Math.round(this.profitRate * 100) / 100, displayCurrency: true},
      {value: this.todayReceiptsCount, label: 'Receipts', percent: Math.round(this.receiptsCountRate * 100) / 100, displayCurrency: false},
      {value: this.todayClientsCount, label: 'Customers', percent: Math.round(this.clientsCountRate * 100) / 100, displayCurrency: false},
      {value: Math.round(this.todayAverageReceipt) / 100, label: 'Average Receipt', percent: Math.round(this.averageReceiptRate * 100) / 100, displayCurrency: true},
    ];
  }

  private initOrderValues(): void {
    const todayOrders = this.orders.filter(order => new Date(order.createdAt).toDateString() === this.todayStr);
    const yesterdayOrders = this.orders.filter(order => new Date(order.createdAt).toDateString() === this.yesterdayStr);
    this.todayRevenue = this.revenue(todayOrders);
    this.revenueRate = this.findRate(this.revenue(yesterdayOrders), this.todayRevenue);
    this.todayProfit = this.todayRevenue;
    this.profitRate = this.revenueRate;
    this.todayReceiptsCount = this.receiptsCount(todayOrders);
    this.receiptsCountRate = this.findRate(this.receiptsCount(yesterdayOrders), this.todayReceiptsCount);
    this.todayAverageReceipt = this.averageReceipt(this.todayRevenue, this.todayReceiptsCount);
    this.averageReceiptRate = this.findRate(this.averageReceipt(this.revenue(yesterdayOrders), this.receiptsCount(yesterdayOrders)),
      this.todayAverageReceipt);
    new Set(this.orders.map(order => new Date(order.createdAt).toDateString().substring(4))).forEach(label => this.revenueChartLabels.push(label));
    this.revenueChartLabels = this.revenueChartLabels.sort();
    this.revenueChartLabels.forEach(label => {
      const dateRevenue = this.orders
        .filter(order => new Date(order.createdAt).toDateString().substring(4) === label)
        .reduce((acc, val) => acc + val.payedTotal, 0);
      this.revenueChartData[0].data?.push(Math.round(dateRevenue) / 100);
    });
    this.paymentMethodsChartData.push(Math.round(this.orders.reduce((acc, val) => acc + val.payedCard, 0)) / 100);
    this.paymentMethodsChartData.push(Math.round(this.orders.reduce((acc, val) => acc + val.payedCash, 0)) / 100);
    this.orderTypesChartData.push(this.orders.filter(order => order.type === 'TAKE_AWAY').length);
    this.orderTypesChartData.push(this.orders.filter(order => order.type === 'ON_PLACE').length);
    this.salesByDayOfWeekChartData[0].data?.push(this.orders.filter(order => new Date(order.createdAt).toDateString().substr(0, 3) === 'Mon').length);
    this.salesByDayOfWeekChartData[0].data?.push(this.orders.filter(order => new Date(order.createdAt).toDateString().substr(0, 3) === 'Tue').length);
    this.salesByDayOfWeekChartData[0].data?.push(this.orders.filter(order => new Date(order.createdAt).toDateString().substr(0, 3) === 'Wed').length);
    this.salesByDayOfWeekChartData[0].data?.push(this.orders.filter(order => new Date(order.createdAt).toDateString().substr(0, 3) === 'Thu').length);
    this.salesByDayOfWeekChartData[0].data?.push(this.orders.filter(order => new Date(order.createdAt).toDateString().substr(0, 3) === 'Fri').length);
    this.salesByDayOfWeekChartData[0].data?.push(this.orders.filter(order => new Date(order.createdAt).toDateString().substr(0, 3) === 'Sat').length);
    this.salesByDayOfWeekChartData[0].data?.push(this.orders.filter(order => new Date(order.createdAt).toDateString().substr(0, 3) === 'Sun').length);
  }

  private initOrderItemValues(): void {
    const distinctItems = new Set(this.orderItems.map(orderItem => orderItem.itemName));

    const popularItems: {itemName: string; count: number}[] = [];

    distinctItems.forEach(itemName => {
      const count = this.orderItems.filter(orderItem => orderItem.itemName === itemName)
        .map(orderItem => orderItem.quantity)
        .reduce((acc, val) => acc + val, 0);
      popularItems.push({itemName, count});
    });
    popularItems.sort((i1, i2) => i1.count - i2.count).reverse().slice(0, 10)
      .forEach(item => {
        this.popularItemsChartData[0].data?.push(item.count);
        this.popularItemsChartLabels.push(item.itemName);
      });
  }

  private initClientValues(): void {
    const todayClients = this.clients.filter(client => new Date(client.createdAt).toDateString() === this.todayStr);
    const yesterdayClients = this.clients.filter(client => new Date(client.createdAt).toDateString() === this.yesterdayStr);
    this.todayClientsCount = this.clientsCount(todayClients);
    this.clientsCountRate = this.findRate(this.clientsCount(yesterdayClients), this.todayClientsCount);
  }

  private findRate(oldValue: number, newValue: number): number {
    return !!oldValue ? (newValue - oldValue) * 100 / oldValue : 0;
  }

}

