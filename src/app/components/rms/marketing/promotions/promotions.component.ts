import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {PromotionApiService} from '../../../../api/promotion-api.service';
import {Promotion} from '../../../../model/promotion';
import { displayedColumns } from 'src/app/util/general-util';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html'
})
export class PromotionsComponent implements OnInit {

  promotions: Promotion[] = [];
  dataSource = new MatTableDataSource<Promotion>();

  public columns: Column[] = [
    {name: 'Name', selected: true},
    {name: 'Start Date', selected: true},
    {name: 'Expiration Date', selected: true},
    {name: 'Actions', selected: true}
  ];

  constructor(private router: Router,
              private api: PromotionApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getPromotions().then(obs => obs.subscribe(promotions => {
      this.promotions = promotions;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/marketing/promotions/new']);
  }

  onEditClick(promotion: Promotion): void {
    this.router.navigate(['/rms/marketing/promotions/new'], {queryParams: {id: promotion.id}});
  }

  onDeleteClick(promotion: Promotion): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Promotion',
        text: 'Are you sure you want to delete promotion "' + promotion.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deletePromotion(promotion.id).then(obs => obs.subscribe(() => {
          this.promotions = this.promotions.filter(p => p !== promotion);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.promotions;
  }


}
