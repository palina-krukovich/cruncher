import {Component, OnInit} from '@angular/core';
import {Dish} from '../../../../model/dish';
import {RecipeIngredient} from '../../../../model/recipe-ingredient';
import {DishApiService} from '../../../../api/dish-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FireStorageService} from '../../../../service/fire-storage.service';
import {FormControl, Validators} from '@angular/forms';
import {digitsOnlyPattern, positiveNumberPattern} from '../../../../util/string-util';
import {ModificationGroup} from '../../../../model/modification-group';
import {minutesFromSeconds, secondsFromSeconds} from '../../../../util/general-util';
import {MenuCategoryApiService} from '../../../../api/menu-category-api.service';
import {WorkshopApiService} from '../../../../api/workshop-api.service';
import {Category} from '../../../../model/category';
import {FlatCategory} from '../new-menu-category/new-menu-category.component';
import {Workshop} from '../../../../model/workshop';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.component.html'
})
export class NewDishComponent implements OnInit {

  private dish: Dish | undefined;

  recipeIngredients: RecipeIngredient[] = [];
  modificationGroups: ModificationGroup[] = [];
  categories: FlatCategory[] = [];
  workshops: Workshop[] = [];

  mode: 'new' | 'edit' = 'new';

  name = new FormControl('', Validators.required);
  code = new FormControl('');
  barcode = new FormControl('');
  category = new FormControl('-');
  workshop = new FormControl('-');
  noDiscount = false;
  price = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);
  productionDescription = new FormControl('');
  cookTimeMinutes = new FormControl(0, Validators.pattern(digitsOnlyPattern));
  cookTimeSeconds = new FormControl(0, Validators.pattern(digitsOnlyPattern));
  color = 'default-color';
  imgFile: File | undefined;
  initialImg: string | undefined;
  photoURL: string | undefined;

  constructor(private api: DishApiService,
              private categoryApi: MenuCategoryApiService,
              private workshopApi: WorkshopApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private storage: FireStorageService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getDish(id).then(obs => obs.subscribe(dish => {
          this.dish = dish;
          this.mode = 'edit';
          this.name.setValue(dish.name);
          this.code.setValue(dish.code || '');
          this.barcode.setValue(dish.barcode || '');
          this.category.setValue(dish.categoryId || '-');
          this.workshop.setValue(dish.workshopId || '-');
          this.noDiscount = dish.noDiscount;
          this.price.setValue(dish.price / 100);
          this.color = dish.color;
          this.initialImg = dish.photoURL;
          this.productionDescription.setValue(dish.productionDescription || '');
          this.cookTimeMinutes.setValue(minutesFromSeconds(dish.cookTimeSeconds));
          this.cookTimeSeconds.setValue(secondsFromSeconds(dish.cookTimeSeconds));
          this.recipeIngredients = dish.recipeIngredients;
          this.modificationGroups = dish.modificationGroups;
        }));
      }
    });
    this.categoryApi.getCategories().then(obs => obs.subscribe(categories => {
      this.fillFlatCategories(categories, 0);
    }));
    this.workshopApi.getWorkshops().then(obs => obs.subscribe(workshops => {
      this.workshops = workshops;
    }));
  }

  get saveDisabled(): boolean {
    return !this.name.value || !this.validRecipeIngredients() || !this.validModificationGroups();
  }

  get cost(): number {
    let cost = 0;
    for (const ri of this.recipeIngredients) {
      cost += (ri.ingredient?.cost || 0) * (ri.grossQuantity || 0);
    }
    return cost / 100;
  }

  get markup(): number {
    return this.price.valid && !!this.cost ? Math.round((this.price.value / this.cost - 1) * 10000) / 100 : 0;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/menu/dishes']);
  }

  getIterable(n: number): Array<number> {
    return Array.from(Array(n).keys());
  }

  onSaveClick(): void {
    if (!!this.imgFile) {
      this.storage.upload(Date.now().toString() + '_' + this.imgFile.name, this.imgFile)
        .then(task => task.ref.getDownloadURL().then(url => {
          this.photoURL = url;
          this.saveDish();
        }));
    } else {
      this.saveDish();
    }
  }

  private saveDish(): void {
    const dish = {
      id: null,
      name: this.name.value,
      code: this.code.value.length === 0 ? null : this.code.value,
      barcode: this.barcode.value.length === 0 ? null : this.barcode.value,
      color: this.color,
      photoURL: this.photoURL || this.initialImg,
      categoryId: this.category.value === '-' ? null : this.category.value,
      workshopId: this.workshop.value === '-' ? null : this.workshop.value,
      noDiscount: this.noDiscount,
      price: (this.price.value * 100) || 0,
      productionDescription: this.productionDescription.value,
      cookTimeSeconds: this.cookTimeMinutes.value * 60 + this.cookTimeSeconds.value,
      recipeIngredients: this.recipeIngredients,
      modificationGroups: this.modificationGroups.map(mg => ({
        id: mg.id,
        name: mg.name,
        type: mg.type,
        minNum: mg.minNum,
        maxNum: mg.maxNum,
        modifications: mg.modifications.map(m => ({
          id: m.id,
          name: m.name,
          ingredientId: m.ingredient?.id,
          withoutWriteOff: m.withoutWriteOff,
          quantity: m.quantity,
          price: m.price
        }))
      }))
    };
    if (this.mode === 'new') {
      this.createDish(dish);
    } else {
      this.updateDish(dish);
    }
  }

  private createDish(dish: any): void {
    this.api.createDish(dish).then(obs => obs.subscribe(() => {
      this.snackBar.open('Added dish ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/dishes']);
    }));
  }

  private updateDish(dish: any): void {
    dish.id = this.dish?.id;
    this.api.updateDish(dish).then(obs => obs.subscribe(() => {
      this.snackBar.open('Edited dish ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/dishes']);
    }));
  }

  private fillFlatCategories(categories: Category[], level: number): void {
    for (const category of categories) {
      this.categories.push({id: category.id, name: category.name, level});
      this.fillFlatCategories(category.subCategories, level + 1);
    }
  }

  private validRecipeIngredients(): boolean {
    for (const recipeIngredient of this.recipeIngredients) {
      if (!recipeIngredient.ingredient || !recipeIngredient.grossQuantity || !recipeIngredient.netQuantity) {
        return false;
      }
    }
    return true;
  }

  private validModificationGroups(): boolean {
    for (const modificationGroup of this.modificationGroups) {
      for (const modification of modificationGroup.modifications) {
        if (!modification.name) {
          return false;
        }
      }
    }
    return true;
  }
}
