import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {Supplier} from '../../../../model/supplier';
import {SupplierApiService} from '../../../../api/supplier-api.service';
import {displayedColumns} from '../../../../util/general-util';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>();
  columns: Column[] = [
    {name: 'Name', selected: true},
    {name: 'Address', selected: true},
    {name: 'Phone Number', selected: true},
    {name: 'Comment', selected: true},
    {name: 'Amount of Supplies', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  constructor(private api: SupplierApiService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getSuppliers().then(obs => obs.subscribe(suppliers => {
      this.suppliers = suppliers;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/inventory/suppliers/new']);
  }

  onEditClick(supplier: Supplier): void {
    this.router.navigate(['/rms/inventory/suppliers/new'], {queryParams: {id: supplier.id}});
  }

  onDeleteClick(supplier: Supplier): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Supplier',
        text: 'Are you sure you want to delete supplier "' + supplier.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteSupplier(supplier.id).then(obs => obs.subscribe(() => {
          this.suppliers = this.suppliers.filter(s => s !== supplier);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.suppliers;
  }

}
