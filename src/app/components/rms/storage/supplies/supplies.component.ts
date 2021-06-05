import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {displayedColumns} from '../../../../util/general-util';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {SupplyApiService} from '../../../../api/supply-api.service';
import {Supply} from '../../../../model/supply';
import {ItemSupply} from '../../../../model/item-supply';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SuppliesComponent implements OnInit {

  supplies: Supply[] = [];
  dataSource = new MatTableDataSource<Supply>();
  expandedElement: Supply | null = null;

  public columns: Column[] = [
    {name: 'Date', selected: true},
    {name: 'Supplier', selected: true},
    {name: 'Products', selected: true},
    {name: 'Comment', selected: true},
    {name: 'Sum', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  recipeColumns = ['Product', 'Unit', 'Quantity', 'Price per Unit', 'Sum'];

  constructor(private api: SupplyApiService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getSupplies().then(obs => obs.subscribe(supplies => {
      this.supplies = supplies;
      this.updateDataSource();
    }));
  }


  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  getProducts(supply: Supply): string {
    const products = supply.itemSupplies.map(item => item.itemName).join(', ');
    return products.length > 100 ? products.substr(0, 100) + '...' : products;
  }

  getUnit(item: ItemSupply): string {
    return item.packName || item.itemUnit
      ? item.itemUnit.toLowerCase()
      : item.itemType === 'PRODUCT'
        ? 'pcs'
        : 'kg';
  }

  onAddClick(): void {
    this.router.navigate(['/rms/inventory/supplies/new']);
  }

  onEditClick(supply: Supply): void {
    this.router.navigate(['/rms/inventory/supplies/new'], {queryParams: {id: supply.id}});
  }

  onDeleteClick(supply: Supply): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Supply',
        text: 'Are you sure you want to delete supply "' + supply.suppliedAt + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteSupply(supply.id).then(obs => obs.subscribe(() => {
          this.supplies = this.supplies.filter(s => s !== supply);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.supplies;
  }

}
