import { Component, OnInit } from '@angular/core';
import {Order} from '../../../model/order';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderApiService} from '../../../api/order-api.service';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  order: Order | undefined;

  cash = new FormControl(0);
  card = new FormControl(0);

  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: OrderApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getOrder(id).then(obs => obs.subscribe(order => {
          this.order = order;
          this.cash.setValue(order.totalPrice / 100);
        }));
      }
    });
  }

  get isValidInput(): boolean {
    return this.card.value <= (this.order?.totalPrice || 0) / 100;
  }

  clearCash(): void {
    this.cash.setValue(0);
  }

  clearCard(): void {
    this.card.setValue(0);
  }

  get change(): number {
    const payedCard = Math.round(this.card.value * 100) || 0;
    const payedCash = Math.round((this.cash.value * 100)) || 0;
    const totalPayed = payedCard + payedCash;
    return (totalPayed - (this.order?.totalPrice || 0)) / 100;
  }

  onPayCLick(): void {
    const payedCard = Math.round(this.card.value * 100) || 0;
    const payedCash = Math.round((this.cash.value * 100)) || 0;
    if (!!this.order) {
      this.api.closeOrder(this.order.id, payedCard, payedCash).then(obs => obs.subscribe(order => {
        this.snackBar.open('Receipt №' + order.receiptNumber + ' closed', 'Ok');
        this.router.navigate(['/pos/board']);
      }));
    }
  }

}
