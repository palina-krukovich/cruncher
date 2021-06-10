import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PositionApiService} from '../../../../api/position-api.service';
import {Position} from '../../../../model/position';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html'
})
export class PositionsComponent implements OnInit {

  positions: Position[] = [];

  constructor(private router: Router,
              private api: PositionApiService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getPositions().then(obs => obs.subscribe(positions => this.positions = positions));
  }

  onAddClick(): void {
    this.router.navigate(['/rms/access/positions/new']);
  }

  onEditClick(position: Position): void {
    this.router.navigate(['/rms/access/positions/new'], {queryParams: {id: position.id}});
  }

  onDeleteClick(position: Position): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Position',
        text: 'Are you sure you want to delete position "' + position.title + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deletePosition(position.id).then(obs => obs.subscribe(() => {
          this.positions = this.positions.filter(p => p !== position);
        }));
      }
    });
  }

}
