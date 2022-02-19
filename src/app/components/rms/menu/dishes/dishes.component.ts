import {Component, OnInit} from '@angular/core';
import {DishApiService} from '../../../../api/dish-api.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Dish} from '../../../../model/dish';
import {MatTableDataSource} from '@angular/material/table';
import {Column} from '../../common/navbar/navbar.component';
import {displayedColumns, minutesFromSeconds, secondsFromSeconds} from 'src/app/util/general-util';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DishesComponent implements OnInit {

  dishes: Dish[] = [];
  dataSource = new MatTableDataSource<Dish>();
  expandedElement: Dish | null = null;

  public columns: Column[] = [
    {name: 'Picture', selected: true},
    {name: 'Name', selected: true},
    {name: 'Category', selected: true},
    {name: 'Workshop', selected: true},
    {name: 'Code', selected: false},
    {name: 'Barcode', selected: false},
    {name: 'No Discount', selected: true},
    {name: 'Price', selected: true},
    {name: 'Cook Time', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];

  recipeColumns = ['Ingredient', 'Processes', 'Gross', 'Net'];

  seconds = (seconds: number) => secondsFromSeconds(seconds);
  minutes = (seconds: number) => minutesFromSeconds(seconds);

  constructor(private api: DishApiService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getDishes().then(obs => obs.subscribe(dishes => {
      this.dishes = dishes;
      this.updateDataSource();
    }));
  }

  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  onAddClick(): void {
    this.router.navigate(['/rms/menu/dishes/new']);
  }

  onTrashClick(): void {
    this.api.getDeletedDishes().then(obs => obs.subscribe(dishes => {
      const trashItems: TrashItem[] = dishes.map(dish => {
        return {
          id: dish.id,
          name: dish.name,
          photoURL: dish.photoURL,
          color: dish.color,
          deletedAt: dish.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Dishes', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverDish(id).then(o => o.subscribe(dish => {
          this.dishes.push(dish);
          this.updateDataSource();
        }));
      });
    }));
  }

  onEditClick(dish: Dish): void {
    this.router.navigate(['/rms/menu/dishes/new'], {queryParams: {id: dish.id}});
  }

  onDeleteClick(dish: Dish): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Dish',
        text: 'Are you sure you want to delete dish "' + dish.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteDish(dish.id).then(obs => obs.subscribe(() => {
          this.dishes = this.dishes.filter(d => d !== dish);
          this.updateDataSource();
        }));
      }
    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.dishes.sort((d1, d2) =>
      d1.categoryName < d2.categoryName ? -1 : d1.categoryName > d2.categoryName ? 1
        : d1.name < d2.name ? -1 : d1.name > d2.name ? 1 : 0);
  }

}
