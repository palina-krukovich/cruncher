import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Product} from '../../../../model/product';
import {displayedColumns} from '../../../../util/general-util';
import {Router} from '@angular/router';
import {ProductApiService} from '../../../../api/product-api.service';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>();

  public columns: Column[] = [
    {name: 'Picture', selected: true},
    {name: 'Name', selected: true},
    {name: 'Category', selected: true},
    {name: 'Workshop', selected: true},
    {name: 'Code', selected: false},
    {name: 'Barcode', selected: false},
    {name: 'No Discount', selected: true},
    {name: 'Cost', selected: true},
    {name: 'Price', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  constructor(private router: Router,
              private api: ProductApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getProducts().then(obs => obs.subscribe(products => {
      this.products = products;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/menu/products/new']);
  }

  onTrashClick(): void {
    this.api.getDeletedProducts().then(obs => obs.subscribe(products => {
      const trashItems: TrashItem[] = products.map(product => {
        return {
          id: product.id,
          name: product.name,
          photoURL: product.photoURL,
          color: product.color,
          deletedAt: product.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Products', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverProduct(id).then(o => o.subscribe(product => {
          this.products.push(product);
          this.updateDataSource();
        }));
      });
    }));
  }

  onEditClick(product: Product): void {
    this.router.navigate(['/rms/menu/products/new'], {queryParams: {id: product.id}});
  }

  onDeleteClick(product: Product): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Product',
        text: 'Are you sure you want to delete product "' + product.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteProduct(product.id).then(obs => obs.subscribe(() => {
          this.products = this.products.filter(p => p !== product);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.products.sort((d1, d2) =>
      d1.categoryName < d2.categoryName ? -1 : d1.categoryName > d2.categoryName ? 1
        : d1.name < d2.name ? -1 : d1.name > d2.name ? 1 : 0);
  }

}
