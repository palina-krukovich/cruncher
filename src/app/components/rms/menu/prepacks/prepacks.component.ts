import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {Prepack} from '../../../../model/prepack';
import {Router} from '@angular/router';
import {PrepackApiService} from '../../../../api/prepack-api.service';
import {displayedColumns, minutesFromSeconds, secondsFromSeconds} from '../../../../util/general-util';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';

@Component({
  selector: 'app-prepacks',
  templateUrl: './prepacks.component.html',
  styleUrls: ['./prepacks.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrepacksComponent implements OnInit {

  prepacks: Prepack[] = [];
  dataSource = new MatTableDataSource<Prepack>();
  expandedElement: Prepack | null = null;

  public columns: Column[] = [
    {name: 'Picture', selected: true},
    {name: 'Name', selected: true},
    {name: 'Code', selected: false},
    {name: 'Cook Time', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  recipeColumns = ['Ingredient', 'Processes', 'Gross', 'Net'];

  seconds = (seconds: number) => secondsFromSeconds(seconds);
  minutes = (seconds: number) => minutesFromSeconds(seconds);

  constructor(private router: Router,
              private api: PrepackApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getPrepacks().then(obs => obs.subscribe(prepacks => {
      this.prepacks = prepacks;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/menu/prepacks/new']);
  }

  onTrashClick(): void {
    this.api.getDeletedPrepacks().then(obs => obs.subscribe(prepacks => {
      const trashItems: TrashItem[] = prepacks.map(prepack => {
        return {
          id: prepack.id,
          name: prepack.name,
          photoURL: prepack.photoURL,
          color: prepack.color,
          deletedAt: prepack.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Prepacks', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverPrepack(id).then(o => o.subscribe(prepack => {
          this.prepacks.push(prepack);
          this.updateDataSource();
        }));
      });
    }));
  }

  onEditClick(prepack: Prepack): void {
    this.router.navigate(['/rms/menu/prepacks/new'], {queryParams: {id: prepack.id}});
  }

  onDeleteClick(prepack: Prepack): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Prepack',
        text: 'Are you sure you want to delete prepack "' + prepack.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deletePrepack(prepack.id).then(obs => obs.subscribe(() => {
          this.prepacks = this.prepacks.filter(p => p !== prepack);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.prepacks;
  }

}
