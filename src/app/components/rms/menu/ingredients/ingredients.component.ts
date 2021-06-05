import {Component, OnInit} from '@angular/core';
import {Column} from '../../common/navbar/navbar.component';
import {Ingredient} from '../../../../model/ingredient';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {IngredientApiService} from '../../../../api/ingredient-api.service';
import {displayedColumns} from '../../../../util/general-util';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {

  ingredients: Ingredient[] = [];
  dataSource: MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>(this.ingredients);

  public columns: Column[] = [
    {name: 'Picture', selected: true},
    {name: 'Name', selected: true},
    {name: 'Code', selected: true},
    {name: 'Barcode', selected: true},
    {name: 'Unit', selected: true},
    {name: 'Losses', selected: true},
    {name: 'Cost', selected: true},
    {name: 'Created', selected: false},
    {name: 'Updated', selected: false},
    {name: 'Actions', selected: true}
  ];


  get displayedColumns(): string[] {
    return displayedColumns(this.columns);
  }

  constructor(private api: IngredientApiService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getIngredients().then(obs => obs.subscribe(ingredients => {
      this.ingredients = ingredients;
      this.updateDataSource();
    }));
  }

  onAddClick(): void {
    this.router.navigate(['/rms/menu/ingredients/new']);
  }

  onEditClick(ingredient: Ingredient): void {
    this.router.navigate(['/rms/menu/ingredients/new'], {queryParams: {id: ingredient.id}});
  }

  onDeleteClick(ingredient: Ingredient): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Ingredient',
        text: 'Are you sure you want to delete ingredient "' + ingredient.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteIngredient(ingredient.id).then(obs => obs.subscribe(() => {
          this.ingredients = this.ingredients.filter(i => i !== ingredient);
          this.updateDataSource();
        }));
      }
    });
  }

  onTrashClick(): void {
    this.api.getDeletedIngredients().then(obs => obs.subscribe(ingredients => {
      const trashItems: TrashItem[] = ingredients.map(ingredient => {
        return {
          id: ingredient.id,
          name: ingredient.name,
          photoURL: ingredient.photoURL,
          color: ingredient.color,
          deletedAt: ingredient.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Ingredients', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverIngredient(id).then(o => o.subscribe(ingredient => {
          this.ingredients.push(ingredient);
          this.updateDataSource();
        }));
      });
    }));
  }

  private updateDataSource(): void {
    this.dataSource.data = this.ingredients;
  }

}
