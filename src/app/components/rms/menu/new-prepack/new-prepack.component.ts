import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {digitsOnlyPattern, positiveNumberPattern} from '../../../../util/string-util';
import {Prepack} from '../../../../model/prepack';
import {PrepackApiService} from '../../../../api/prepack-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FireStorageService} from '../../../../service/fire-storage.service';
import {IngredientApiService} from 'src/app/api/ingredient-api.service';
import {Ingredient} from '../../../../model/ingredient';
import {RecipeIngredient} from '../../../../model/recipe-ingredient';
import {minutesFromSeconds, secondsFromSeconds} from '../../../../util/general-util';

@Component({
  selector: 'app-new-prepack',
  templateUrl: './new-prepack.component.html'
})
export class NewPrepackComponent implements OnInit {

  private prepack: Prepack | undefined;

  recipeIngredients: RecipeIngredient[] = [];

  mode: 'new' | 'edit' = 'new';

  name = new FormControl('', Validators.required);
  code = new FormControl('');
  productionDescription = new FormControl('');
  cookTimeMinutes = new FormControl(0, Validators.pattern(digitsOnlyPattern));
  cookTimeSeconds = new FormControl(0, Validators.pattern(digitsOnlyPattern));
  color = 'default-color';
  imgFile: File | undefined;
  initialImg: string | undefined;
  photoURL: string | undefined;

  constructor(private api: PrepackApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private storage: FireStorageService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getPrepack(id).then(obs => obs.subscribe(prepack => {
          this.prepack = prepack;
          this.mode = 'edit';
          this.name.setValue(prepack.name);
          this.code.setValue(prepack.code || '');
          this.color = prepack.color;
          this.initialImg = prepack.photoURL;
          this.productionDescription.setValue(prepack.productionDescription || '');
          this.cookTimeMinutes.setValue(minutesFromSeconds(prepack.cookTimeSeconds));
          this.cookTimeSeconds.setValue(secondsFromSeconds(prepack.cookTimeSeconds));
          this.recipeIngredients = prepack.recipeIngredients;
        }));
      }
    });
  }

  get saveDisabled(): boolean {
    return !this.name.value || !this.validRecipeIngredients();
  }

  onBackClick(): void {
    this.router.navigate(['/rms/menu/prepacks']);
  }

  onSaveClick(): void {
    if (!!this.imgFile) {
      this.storage.upload(Date.now().toString() + '_' + this.imgFile.name, this.imgFile)
        .then(task => task.ref.getDownloadURL().then(url => {
          this.photoURL = url;
          this.savePrepack();
        }));
    } else {
      this.savePrepack();
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

  private savePrepack(): void {
    const prepack = {
      id: null,
      name: this.name.value,
      code: this.code.value.length === 0 ? null : this.code.value,
      color: this.color,
      photoURL: this.photoURL || this.initialImg,
      productionDescription: this.productionDescription.value,
      cookTimeSeconds: this.cookTimeMinutes.value * 60 + this.cookTimeSeconds.value,
      recipeIngredients: this.recipeIngredients
    };
    if (this.mode === 'new') {
      this.createPrepack(prepack);
    } else {
      this.updatePrepack(prepack);
    }
  }

  private createPrepack(prepack: any): void {
    this.api.createPrepack(prepack).then(obs => obs.subscribe(() => {
      this.snackBar.open('Added prepack ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/prepacks']);
    }));
  }

  private updatePrepack(prepack: any): void {
    prepack.id = this.prepack?.id;
    this.api.updatePrepack(prepack).then(obs => obs.subscribe(() => {
      this.snackBar.open('Edited prepack ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/prepacks']);
    }));
  }

}
