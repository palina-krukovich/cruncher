import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Pack} from '../../../../model/pack';
import {PackApiService} from '../../../../api/pack-api.service';
import {positiveNumberPattern} from '../../../../util/string-util';

@Component({
  selector: 'app-new-pack',
  templateUrl: './new-pack.component.html'
})
export class NewPackComponent implements OnInit {

  private pack: Pack | undefined;

  mode: 'new' | 'edit' = 'new';
  name = new FormControl('', Validators.required);
  unit = new FormControl('KG', Validators.required);
  quantity = new FormControl(0, [Validators.required, Validators.pattern(positiveNumberPattern)]);

  constructor(private api: PackApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getPack(id).then(obs => obs.subscribe(pack => {
          this.pack = pack;
          this.mode = 'edit';
          this.name.setValue(pack.name);
          this.unit.setValue(pack.unit);
          this.quantity.setValue(pack.unitQuantity);
        }));
      }
    });
  }

  get saveDisabled(): boolean {
    return !this.name.valid || !this.unit.valid || !this.quantity.valid;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/inventory/packs']);
  }

  onSaveClick(): void {
    if (this.mode === 'new') {
      this.api.createPack({name: this.name.value, unit: this.unit.value, unitQuantity: this.quantity.value})
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Added pack ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/inventory/packs']);
        }));
    } else {
      this.api.updatePack({id: this.pack?.id, name: this.name.value, unit: this.unit.value, unitQuantity: this.quantity.value})
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Edited pack ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/inventory/packs']);
        }));
    }
  }
}
