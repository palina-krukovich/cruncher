import {Component, OnInit} from '@angular/core';
import {OrderApiService} from '../../../../api/order-api.service';
import {Order} from '../../../../model/order';
import {EmployeeApiService} from '../../../../api/employee-api.service';
import {Employee} from '../../../../model/employee';
import {MatTableDataSource} from '@angular/material/table';

export interface EmployeeReport {
  employeeId: string;
  employeeName: string;
  employeePosition: string;
  revenue: number;
  receipts: number;
  averageReceipt: number;
}

@Component({
  selector: 'app-employees-report',
  templateUrl: './employees-report.component.html'
})
export class EmployeesReportComponent implements OnInit {

  orders: Order[] = [];
  employees: Employee[] = [];
  employeeReports: EmployeeReport[] = [];
  dataSource = new MatTableDataSource<EmployeeReport>();
  displayedColumns = ['Name', 'Position', 'Revenue', 'Receipts', 'Average Receipt'];

  constructor(private api: OrderApiService,
              private employeeApi: EmployeeApiService) {
  }

  ngOnInit(): void {
    this.api.getOrders().then(obs => obs.subscribe(orders => {
      this.orders = orders;
      this.employeeApi.getEmployees().then(o => o.subscribe(employees => {
        this.employees = employees;
        this.init();
      }));
    }));
  }

  private init(): void {
    this.employees.forEach(employee => {
      const employeeOrders = this.orders.filter(order => order.employee.id === employee.id);
      const revenue = employeeOrders.map(order => order.totalPrice).reduce((a, b) => a + b, 0);
      const receipts = employeeOrders.length;
      const averageReceipt = revenue / receipts;
      this.employeeReports.push({
        employeeId: employee.id,
        employeeName: employee.name,
        employeePosition: employee.position.title,
        revenue: revenue / 100,
        receipts,
        averageReceipt: averageReceipt / 100
      });
    });
    this.dataSource.data = this.employeeReports;
  }

}
