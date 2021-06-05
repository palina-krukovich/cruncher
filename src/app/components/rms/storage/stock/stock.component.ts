import { Component, OnInit } from '@angular/core';
import {Stock} from '../../../../model/stock';
import {InventoryApiService} from '../../../../api/inventory-api.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit {

  stock: Stock[] = [];

  displayedColumns = ['Picture', 'Name', 'Type', 'Category', 'Stock', 'Cost', 'Sum'];

  constructor(private api: InventoryApiService) { }

  ngOnInit(): void {
    this.api.getStock().then(obs => obs.subscribe(stock => this.stock = stock));
  }

}
