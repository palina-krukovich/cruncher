import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {Employee} from '../../../../model/employee';
import {EmployeeApiService} from '../../../../api/employee-api.service';
import { displayedColumns } from 'src/app/util/general-util';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>();

  public columns: Column[] = [
    {name: 'Name', selected: true},
    {name: 'Position', selected: true},
    {name: 'Gender', selected: true},
    {name: 'Email', selected: true},
    {name: 'Phone', selected: true},
    {name: 'Permissions', selected: true},
    {name: 'Address', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  constructor(private router: Router,
              private api: EmployeeApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getEmployees().then(obs => obs.subscribe(employees => {
      this.employees = employees;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  getPermissions(employee: Employee): string {
    const permissions = [];
    if (employee.rms) { permissions.push('RMS'); }
    if (employee.pos) { permissions.push('POS'); }
    if (employee.kds) { permissions.push('KDS'); }
    return permissions.join(', ');
  }

  onAddClick(): void {
    this.router.navigate(['/rms/access/employees/new']);
  }

  onTrashClick(): void {
    this.api.getDeletedEmployees().then(obs => obs.subscribe(employees => {
      const trashItems: TrashItem[] = employees.map(employee => {
        return {
          id: employee.id,
          color: null,
          photoURL: null,
          name: employee.name,
          deletedAt: employee.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Employees', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverEmployee(id).then(o => o.subscribe(employee => {
          this.employees.push(employee);
          this.updateDataSource();
        }));
      });
    }));
  }

  onEditClick(employee: Employee): void {
    this.router.navigate(['/rms/access/employees/new'], {queryParams: {id: employee.id}});
  }

  onDeleteClick(employee: Employee): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Employee',
        text: 'Are you sure you want to delete employee "' + employee.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteEmployee(employee.id).then(obs => obs.subscribe(() => {
          this.employees = this.employees.filter(e => e !== employee);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.employees;
  }

}
