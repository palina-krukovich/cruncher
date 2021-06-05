import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product';
import {FormControl, Validators} from '@angular/forms';
import {positiveNumberPattern} from '../../../../util/string-util';
import {ProductApiService} from '../../../../api/product-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../../model/category';
import {Workshop} from '../../../../model/workshop';
import {MenuCategoryApiService} from '../../../../api/menu-category-api.service';
import {WorkshopApiService} from '../../../../api/workshop-api.service';
import {FlatCategory} from '../new-menu-category/new-menu-category.component';
import {FireStorageService} from '../../../../service/fire-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {

  private product: Product | undefined;
  categories: FlatCategory[] = [];
  workshops: Workshop[] = [];

  mode: 'new' | 'edit' = 'new';


  name = new FormControl('', Validators.required);
  code = new FormControl('');
  barcode = new FormControl('');
  category = new FormControl('-');
  workshop = new FormControl('-');
  cost = new FormControl(0, Validators.pattern(positiveNumberPattern));
  markup = new FormControl(0, Validators.pattern(positiveNumberPattern));
  price = new FormControl(0, Validators.pattern(positiveNumberPattern));
  noDiscount = false;
  color = 'default-color';
  imgFile: File | undefined;
  initialImg: string | undefined;
  photoURL: string | undefined;

  constructor(private api: ProductApiService,
              private categoryApi: MenuCategoryApiService,
              private workshopApi: WorkshopApiService,
              private router: Router,
              private route: ActivatedRoute,
              private storage: FireStorageService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getProduct(id).then(obs => obs.subscribe(product => {
          this.product = product;
          this.mode = 'edit';
          this.name.setValue(product.name);
          this.code.setValue(product.code || '');
          this.barcode.setValue(product.barcode || '');
          this.category.setValue(product.categoryId || '-');
          this.workshop.setValue(product.workshopId || '-');
          this.noDiscount = product.noDiscount;
          this.cost.setValue(product.cost / 100);
          this.price.setValue(product.price / 100);
          this.setMarkupValue();
          this.color = product.color;
          this.initialImg = product.photoURL;
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

  setMarkupValue(): void {
    !this.cost.value
      ? this.markup.setValue(0)
      : this.markup.setValue(Math.round(((this.price.value as number) / (this.cost.value as number) - 1) * 100 * 100) / 100);
  }

  setPriceValue(): void {
    !this.cost.value
      ? this.price.setValue(0)
      : this.price.setValue(Math.round((this.cost.value as number) * (1 + (this.markup.value as number) / 100) * 100) / 100);
  }

  get saveDisabled(): boolean {
    return !this.name.value;
  }

  getIterable(n: number): Array<number> {
    return Array.from(Array(n).keys());
  }

  onBackClick(): void {
    this.router.navigate(['/rms/menu/products']);
  }

  onSaveClick(): void {
    if (!!this.imgFile) {
      this.storage.upload(Date.now().toString() + '_' + this.imgFile.name, this.imgFile)
        .then(task => task.ref.getDownloadURL().then(url => {
          this.photoURL = url;
          this.saveProduct();
        }));
    } else {
      this.saveProduct();
    }
  }

  private fillFlatCategories(categories: Category[], level: number): void {
    for (const category of categories) {
      this.categories.push({id: category.id, name: category.name, level});
      this.fillFlatCategories(category.subCategories, level + 1);
    }
  }

  private saveProduct(): void {
    const product = {
      id: null,
      name: this.name.value,
      code: this.code.value.length === 0 ? null : this.code.value,
      barcode: this.barcode.value.length === 0 ? null : this.barcode.value,
      color: this.color,
      photoURL: this.photoURL || this.initialImg,
      categoryId: this.category.value === '-' ? null : this.category.value,
      workshopId: this.workshop.value === '-' ? null : this.workshop.value,
      noDiscount: this.noDiscount,
      cost: Math.round(this.cost.value * 100),
      price: Math.round(this.price.value * 100)
    };
    if (this.mode === 'new') {
      this.createProduct(product);
    } else {
      this.updateProduct(product);
    }
  }

  private createProduct(product: any): void {
    this.api.createProduct(product).then(obs => obs.subscribe(() => {
      this.snackBar.open('Added product ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/products']);
    }));
  }

  private updateProduct(product: any): void {
    product.id = this.product?.id;
    this.api.updateProduct(product).then(obs => obs.subscribe(() => {
      this.snackBar.open('Edited product ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/products']);
    }));
  }

}
