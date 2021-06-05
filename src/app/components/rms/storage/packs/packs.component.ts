import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Pack} from '../../../../model/pack';
import {PackApiService} from '../../../../api/pack-api.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import { displayedColumns } from 'src/app/util/general-util';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html'
})
export class PacksComponent implements OnInit {

  packs: Pack[] = [];
  dataSource = new MatTableDataSource<Pack>();
  columns: Column[] = [
    {name: 'Name', selected: true},
    {name: 'Quantity', selected: true},
    {name: 'Unit', selected: true},
    {name: 'Actions', selected: true}
  ];

  constructor(private api: PackApiService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getPacks().then(obs => obs.subscribe(packs => {
      this.packs = packs;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/inventory/packs/new']);
  }

  onEditClick(pack: Pack): void {
    this.router.navigate(['/rms/inventory/packs/new'], {queryParams: {id: pack.id}});
  }

  onDeleteClick(pack: Pack): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Pack',
        text: 'Are you sure you want to delete pack "' + pack.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deletePack(pack.id).then(obs => obs.subscribe(() => {
          this.packs = this.packs.filter(p => p !== pack);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.packs;
  }

}
