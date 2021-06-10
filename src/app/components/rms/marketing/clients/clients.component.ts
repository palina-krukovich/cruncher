import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import { Client } from 'src/app/model/client';
import {ClientApiService} from '../../../../api/client-api.service';
import {ClientGroup} from '../../../../model/client-group';
import { displayedColumns } from 'src/app/util/general-util';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  dataSource = new MatTableDataSource<Client>();
  clientGroups: ClientGroup[] = [];

  public columns: Column[] = [
    {name: 'Name', selected: true},
    {name: 'Customer Group', selected: true},
    {name: 'Personal Discount', selected: true},
    {name: 'Card Number', selected: false},
    {name: 'Birthday', selected: true},
    {name: 'Gender', selected: true},
    {name: 'Email', selected: true},
    {name: 'Phone', selected: true},
    {name: 'Address', selected: false},
    {name: 'Comment', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  constructor(private router: Router,
              private api: ClientApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getClients().then(obs => obs.subscribe(clients => {
      this.clients = clients;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/marketing/clients/new']);
  }

  onTrashClick(): void {
    this.api.getDeletedClients().then(obs => obs.subscribe(clients => {
      const trashItems: TrashItem[] = clients.map(client => {
        return {
          id: client.id,
          color: null,
          photoURL: null,
          name: client.name,
          deletedAt: client.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Customers', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverClient(id).then(o => o.subscribe(client => {
          this.clients.push(client);
          this.updateDataSource();
        }));
      });
    }));
  }

  onEditClick(client: Client): void {
    this.router.navigate(['/rms/marketing/clients/new'], {queryParams: {id: client.id}});
  }

  onDeleteClick(client: Client): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Customer',
        text: 'Are you sure you want to delete customer "' + client.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteClient(client.id).then(obs => obs.subscribe(() => {
          this.clients = this.clients.filter(c => c !== client);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.clients;
  }


}
