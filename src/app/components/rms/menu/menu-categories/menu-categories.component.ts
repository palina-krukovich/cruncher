import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../model/category';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../common/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {TrashDialogComponent, TrashItem} from '../../common/trash-dialog/trash-dialog.component';
import {MenuCategoryApiService} from '../../../../api/menu-category-api.service';

@Component({
  selector: 'app-menu-categories',
  templateUrl: './menu-categories.component.html'
})
export class MenuCategoriesComponent implements OnInit {

  categories: Category[] = [];

  treeControl = new NestedTreeControl<Category>(category => category.subCategories);
  dataSource = new MatTreeNestedDataSource<Category>();

  constructor(private api: MenuCategoryApiService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.api.getCategories().then(obs => obs.subscribe(categories => {
      this.categories = categories;
      this.updateDataSource();
    }));
  }

  hasChild = (_: number, category: Category) => !!category.subCategories && category.subCategories.length > 0;

  deleteCategory(category: Category): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Menu Category',
        text: 'Are you sure you want to delete category "' + category.name + '"?',
        yesBtn: true,
        noBtn: true
      }
    }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.api.deleteCategory(category.id).then(obs => obs.subscribe(() => {
          this.categories = this.categories.filter(c => c !== category);
          this.updateDataSource();
        }));
      }
    });
  }

  showTrashDialog(): void {
    this.api.getDeletedCategories().then(obs => obs.subscribe(categories => {
      const trashItems: TrashItem[] = categories.map(category => {
        return {
          id: category.id,
          name: category.name,
          photoURL: category.photoURL,
          color: category.color,
          deletedAt: category.updatedAt
        };
      });
      this.dialog.open(TrashDialogComponent, {
        data: {title: 'Deleted Categories', trashItems},
        width: '600px'
      }).componentInstance.recoverClick.subscribe(id => {
        this.api.recoverCategory(id).then(o => o.subscribe(category => {
          this.categories.push(category);
          this.updateDataSource();
        }));
      });
    }));
  }


  openNewCategoryPage(): void {
    this.router.navigate(['/rms/menu/menu-categories/new']);
  }

  openEditCategoryPage(category: Category): void {
    this.router.navigate(['/rms/menu/menu-categories/new'], {queryParams: {id: category.id}});
  }

  private updateDataSource(): void {
    this.dataSource.data = this.categories;
  }
}
