import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {Category} from '../../../../model/category';
import {FireStorageService} from '../../../../service/fire-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MenuCategoryApiService} from '../../../../api/menu-category-api.service';

export interface FlatCategory {
  id: string;
  name: string;
  level: number;
}

@Component({
  selector: 'app-new-menu-category',
  templateUrl: './new-menu-category.component.html'
})
export class NewMenuCategoryComponent implements OnInit {

  private category: Category | undefined;

  mode: 'new' | 'edit' = 'new';
  name = new FormControl('', Validators.required);
  parentCategory = new FormControl('top-screen');
  imgFile: File | undefined;
  initialImg: string | undefined;
  photoURL: string | undefined;
  color: string | undefined = 'default-color';

  flatCategories: FlatCategory[] = [];

  constructor(private router: Router,
              private api: MenuCategoryApiService,
              private storage: FireStorageService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getCategory(id).then(obs => obs.subscribe(category => {
          this.mode = 'edit';
          this.category = category;
          this.name.setValue(category.name);
          this.parentCategory.setValue(category.parentCategoryId || 'top-screen');
          this.color = this.category.color;
          this.initialImg = this.category.photoURL;
        }));
      }
    });
    this.api.getCategories().then(obs => obs.subscribe(categories => {
      this.fillFlatCategories(categories, 0);
    }));
  }

  openCategoriesPage(): void {
    this.router.navigate(['/rms/menu/menu-categories']);
  }

  getIterable(n: number): Array<number> {
    return Array.from(Array(n).keys());
  }

  saveBtnDisabled(): boolean {
    return !this.name.value;
  }

  onSaveClick(): void {
    if (!!this.imgFile) {
      this.storage.upload(Date.now().toString() + '_' + this.imgFile.name, this.imgFile)
        .then(task => task.ref.getDownloadURL().then(url => {
          this.photoURL = url;
          this.saveCategory();
        }));
    } else {
      this.saveCategory();
    }
  }

  private fillFlatCategories(categories: Category[], level: number): void {
    for (const category of categories) {
      this.flatCategories.push({id: category.id, name: category.name, level});
      this.fillFlatCategories(category.subCategories, level + 1);
    }
  }

  private saveCategory(): void {
    const category = {
      id: null,
      name: this.name.value,
      color: this.color,
      photoURL: this.photoURL || this.initialImg,
      parentCategoryId: this.parentCategory.value === 'top-screen' ? null : this.parentCategory.value
    };
    if (this.mode === 'new') {
      this.createCategory(category);
    } else {
      this.updateCategory(category);
    }
  }

  private createCategory(category: any): void {
    this.api.createCategory(category).then(obs => obs.subscribe(() => {
      this.snackBar.open('Added category ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/menu-categories']);
    }));
  }

  private updateCategory(category: any): void {
    category.id = this.category?.id;
    this.api.updateCategory(category).then(obs => obs.subscribe(() => {
      this.snackBar.open('Edited category ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/menu-categories']);
    }));
  }

}
