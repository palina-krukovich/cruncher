import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {ClientGroup} from '../../../../model/client-group';
import {ClientGroupApiService} from '../../../../api/client-group-api.service';
import {displayedColumns} from '../../../../util/general-util';

@Component({
  selector: 'app-client-groups',
  templateUrl: './client-groups.component.html'
})
export class ClientGroupsComponent implements OnInit {

  clientGroups: ClientGroup[] = [];
  dataSource = new MatTableDataSource<ClientGroup>();

  public columns: Column[] = [
    {name: 'Name', selected: true},
    {name: 'Loyalty Type', selected: true},
    {name: 'Discount Rate', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  constructor(private router: Router,
              private api: ClientGroupApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getClientGroups().then(obs => obs.subscribe(clientGroups => {
      this.clientGroups = clientGroups;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/marketing/client-groups/new']);
  }

  onTrashClick(): void {
    this.api.getDeletedClientGroups().then(obs => obs.subscribe(clientGroups => {
      const trashItems: TrashItem[] = clientGroups.map(clientGroup => {
        return {
          id: clientGroup.id,
          color: null,
          photoURL: null,
          name: clientGroup.name,
          deletedAt: clientGroup.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Customer Groups', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverClientGroup(id).then(o => o.subscribe(clientGroup => {
          this.clientGroups.push(clientGroup);
          this.updateDataSource();
        }));
      });
    }));
  }

  onEditClick(clientGroup: ClientGroup): void {
    this.router.navigate(['/rms/marketing/client-groups/new'], {queryParams: {id: clientGroup.id}});
  }

  onDeleteClick(clientGroup: ClientGroup): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Customer Group',
        text: 'Are you sure you want to delete Customer Group "' + clientGroup.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteClientGroup(clientGroup.id).then(obs => obs.subscribe(() => {
          this.clientGroups = this.clientGroups.filter(cg => cg !== clientGroup);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.clientGroups;
  }

}
