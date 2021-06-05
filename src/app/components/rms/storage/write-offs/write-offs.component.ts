import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {WriteOff} from '../../../../model/write-off';
import {WriteOffApiService} from '../../../../api/write-off-api.service';
import { displayedColumns } from 'src/app/util/general-util';

@Component({
  selector: 'app-write-offs',
  templateUrl: './write-offs.component.html'
})
export class WriteOffsComponent implements OnInit {

  writeOffs: WriteOff[] = [];
  dataSource = new MatTableDataSource<WriteOff>();
  columns: Column[] = [
    {name: 'Date', selected: true},
    {name: 'Product', selected: true},
    {name: 'Quantity', selected: true},
    {name: 'Type', selected: true},
    {name: 'Reason', selected: true},
    {name: 'Actions', selected: true}
  ];

  constructor(private api: WriteOffApiService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getWriteOffs().then(obs => obs.subscribe(writeOffs => {
      this.writeOffs = writeOffs;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/inventory/write-offs/new']);
  }

  onEditClick(writeOff: WriteOff): void {
    this.router.navigate(['/rms/inventory/write-offs/new'], {queryParams: {id: writeOff.id}});
  }

  onDeleteClick(writeOff: WriteOff): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Write Off',
        text: 'Are you sure you want to delete Write Off of ' + writeOff.item.name + ' on ' + writeOff.writtenOffAt + '?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteWriteOff(writeOff.id).then(obs => obs.subscribe(() => {
          this.writeOffs = this.writeOffs.filter(w => w !== writeOff);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.writeOffs;
  }

}
