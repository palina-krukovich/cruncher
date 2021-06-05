import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../../../model/ingredient';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {FireStorageService} from '../../../../service/fire-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IngredientApiService} from '../../../../api/ingredient-api.service';
import {positiveNumberPattern} from '../../../../util/string-util';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html'
})
export class NewIngredientComponent implements OnInit {

  private ingredient: Ingredient | undefined;

  mode: 'new' | 'edit' = 'new';

  name = new FormControl('', Validators.required);
  code = new FormControl('');
  barcode = new FormControl('');
  unit = new FormControl('KG');
  lossClear = new FormControl('', Validators.pattern(positiveNumberPattern));
  lossBoil = new FormControl('', Validators.pattern(positiveNumberPattern));
  lossFry = new FormControl('', Validators.pattern(positiveNumberPattern));
  lossStew = new FormControl('', Validators.pattern(positiveNumberPattern));
  lossBake = new FormControl('', Validators.pattern(positiveNumberPattern));
  roundInventory = new FormControl(true);
  weightPerPiece = new FormControl(0, Validators.pattern(positiveNumberPattern));

  color = 'default-color';
  imgFile: File | undefined;
  initialImg: string | undefined;
  photoURL: string | undefined;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: IngredientApiService,
              private storage: FireStorageService,
              private snackBar: MatSnackBar) {
  }

  get saveDisabled(): boolean {
    return !this.name.value;
  }

  get kgSelected(): boolean {
    return this.unit.value === 'KG';
  }

  get pcsSelected(): boolean {
    return this.unit.value === 'PCS';
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getIngredient(id).then(obs => obs.subscribe(ingredient => {
          this.ingredient = ingredient;
          this.mode = 'edit';
          this.name.setValue(ingredient.name);
          this.code.setValue(ingredient.code || '');
          this.barcode.setValue(ingredient.barcode || '');
          this.unit.setValue(ingredient.unit);
          this.lossClear.setValue(ingredient.lossClear || 0);
          this.lossBoil.setValue(ingredient.lossBoil || 0);
          this.lossFry.setValue(ingredient.lossFry || 0);
          this.lossStew.setValue(ingredient.lossStew || 0);
          this.lossBake.setValue(ingredient.lossBake || 0);
          this.roundInventory.setValue(ingredient.roundInventory);
          this.weightPerPiece.setValue((ingredient.weightPerPiece || 0) * 1000);
          this.color = ingredient.color || 'default-color';
          this.initialImg = ingredient.photoURL;
        }));
      }
    });
  }

  onBackClick(): void {
    this.router.navigate(['/rms/menu/ingredients']);
  }

  onSaveClick(): void {
    if (!!this.imgFile) {
      this.storage.upload(Date.now().toString() + '_' + this.imgFile.name, this.imgFile)
        .then(task => task.ref.getDownloadURL().then(url => {
          this.photoURL = url;
          this.saveIngredient();
        }));
    } else {
      this.saveIngredient();
    }
  }

  private saveIngredient(): void {
    const ingredient = {
      id: null,
      name: this.name.value,
      code: this.code.value.length === 0 ? null : this.code.value,
      barcode: this.barcode.value.length === 0 ? null : this.barcode.value,
      unit: this.unit.value,
      lossClear: this.lossClear.value || 0,
      lossBoil: this.lossBoil.value || 0,
      lossFry: this.lossFry.value || 0,
      lossStew: this.lossStew.value || 0,
      lossBake: this.lossBake.value || 0,
      roundInventory: this.roundInventory.value,
      weightPerPiece: (this.weightPerPiece.value || 0) / 1000,
      color: this.color,
      photoURL: this.photoURL || this.initialImg
    };
    if (this.mode === 'new') {
      this.createIngredient(ingredient);
    } else {
      this.updateIngredient(ingredient);
    }
  }

  private createIngredient(ingredient: any): void {
    this.api.createIngredient(ingredient).then(obs => obs.subscribe(() => {
      this.snackBar.open('Added ingredient ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/ingredients']);
    }));
  }

  private updateIngredient(ingredient: any): void {
    ingredient.id = this.ingredient?.id;
    this.api.updateIngredient(ingredient).then(obs => obs.subscribe(() => {
      this.snackBar.open('Edited ingredient ' + this.name.value, 'Ok');
      this.router.navigate(['/rms/menu/ingredients']);
    }));
  }

}
