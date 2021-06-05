import {Component, OnInit} from '@angular/core';
import {Workshop} from '../../../../model/workshop';
import {MatTableDataSource} from '@angular/material/table';
import {WorkshopApiService} from '../../../../api/workshop-api.service';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {displayedColumns} from '../../../../util/general-util';
import {Column} from '../../common/navbar/navbar.component';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html'
})
export class WorkshopsComponent implements OnInit {

  workshops: Workshop[] = [];
  dataSource = new MatTableDataSource<Workshop>();
  columns: Column[] = [
    {name: 'Name', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];


  constructor(private api: WorkshopApiService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getWorkshops().then(obs => obs.subscribe(workshops => {
      this.workshops = workshops;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/menu/workshops/new']);
  }

  onEditClick(workshop: Workshop): void {
    this.router.navigate(['/rms/menu/workshops/new'], {queryParams: {id: workshop.id}});
  }

  onDeleteClick(workshop: Workshop): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Workshop',
        text: 'Are you sure you want to delete workshop "' + workshop.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteWorkshop(workshop.id).then(obs => obs.subscribe(() => {
          this.workshops = this.workshops.filter(w => w !== workshop);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.workshops;
  }

}
