import { Component, OnInit } from '@angular/core';
import {InventoryApiService} from '../../../../api/inventory-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory} from '../../../../model/inventory';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html'
})
export class ViewInventoryComponent implements OnInit {

  inventoryDate: Date | null = null;
  inventories: Inventory[] = [];

  displayedColumns = ['Name', 'Last Inventory Check', 'Initial Balance', 'Supplies', 'Sales', 'Waste', 'Expected Balance',
    'Actual Balance', 'Difference', 'Difference, byn'];

  constructor(private api: InventoryApiService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const checkedAt = params.get('checkedAt');
      if (!!checkedAt) {
        this.inventoryDate = new Date(checkedAt);
        this.api.getInventoriesByCheckedAt(new Date(checkedAt)).then(obs => obs.subscribe(inventories => {
          this.inventories = inventories;
        }));
      }
    });
  }

  onBackClick(): void {
    this.router.navigate(['/rms/inventory/inventories']);
  }

  getUnit(inventory: Inventory): string {
    return inventory.item.itemType === 'PRODUCT' ? 'pcs' : inventory.item.unit.toLowerCase();
  }

}
