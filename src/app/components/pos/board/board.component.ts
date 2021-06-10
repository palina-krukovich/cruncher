import {Component, OnInit} from '@angular/core';
import {Hall} from '../../../model/hall';
import {HallApiService} from '../../../api/hall-api.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../rms/common/confirm-dialog/confirm-dialog.component';
import {DiningTable} from '../../../model/dining-table';
import {OrderApiService} from '../../../api/order-api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  halls: Hall[] = [];
  loading = false;

  constructor(private api: HallApiService,
              private router: Router,
              private dialog: MatDialog,
              private orderApi: OrderApiService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.api.getHalls().then(obs => obs.subscribe(halls => {
      this.halls = halls;
      this.loading = false;
    }));
  }

  getReceiptNumbers(table: DiningTable): string {
    return table.orders.map(order => '№' + order.receiptNumber).join(', ');
  }

  getIndex(hallId: string): number {
    const hallMap = document.getElementById(hallId);
    return Math.min(hallMap?.offsetWidth || 0, hallMap?.offsetHeight || 0);
  }

  onAddHallClick(): void {
    this.router.navigate(['/pos/board/new']);
  }

  onEditHallClick(hall: Hall): void {
    this.router.navigate(['/pos/board/new'], {queryParams: {id: hall.id}});
  }

  onDeleteHallClick(hall: Hall): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Hallk',
        text: 'Are you sure you want to delete hall "' + hall.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteHall(hall.id).then(obs => obs.subscribe(() => {
          this.halls = this.halls.filter(h => h.id !== hall.id);
        }));
      }
    });
  }

  onAddOrderClick(table: DiningTable): void {
    if (!table.hasActiveOrders) {
      this.orderApi.createOrder({
        tableId: table.id,
        type: 'ON_PLACE'
      }).then(obs => obs.subscribe((order) => {
        this.router.navigate(['/pos/order'], {queryParams: {id: order.id}});
      }));
    } else {
      this.router.navigate(['/pos/order'], {queryParams: {id: table.orders[0].orderId}});
    }
  }

}
