import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {Inventory} from '../../../../model/inventory';
import {InventoryApiService} from '../../../../api/inventory-api.service';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html'
})
export class InventoriesComponent implements OnInit {

  inventories: Inventory[] = [];

  constructor(private api: InventoryApiService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getInventories().then(obs => obs.subscribe(inventories => this.inventories = inventories));
  }

  get inventoryDates(): Set<Date> {
    return new Set(this.inventories.map(inventory => inventory.checkedAt));
  }

  getInventoriesIdsByDate(date: Date): string[] {
    return this.inventories.filter(inventory => inventory.checkedAt === date).map(inventory => inventory.id);
  }

  getInventoryResult(date: Date): number {
    return this.inventories.filter(inventory => inventory.checkedAt === date)
      .reduce((curr, i) => curr + i.differenceValue, 0);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/inventory/inventories/new']);
  }

  onEditClick(inventoryDate: Date): void {
    this.router.navigate(['/rms/inventory/inventories/new'], {queryParams: {checkedAt: inventoryDate}});
  }

  onViewClick(inventoryDate: Date): void {
    this.router.navigate(['/rms/inventory/inventories/view'], {queryParams: {checkedAt: inventoryDate}});
  }

  onDeleteClick(inventoryDate: Date): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Inventory',
        text: 'Are you sure you want to delete inventory ' + inventoryDate + '?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteInventories(this.getInventoriesIdsByDate(inventoryDate)).then(obs => obs.subscribe(() => {
          this.inventories = this.inventories.filter(i => i.checkedAt !== inventoryDate);
        }));
      }
    });
  }

}
