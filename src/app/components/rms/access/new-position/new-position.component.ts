import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Position} from '../../../../model/position';
import {PositionApiService} from '../../../../api/position-api.service';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html'
})
export class NewPositionComponent implements OnInit {

  private position: Position | undefined;

  mode: 'new' | 'edit' = 'new';
  title = new FormControl('', Validators.required);
  description = new FormControl('');

  constructor(private api: PositionApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getPosition(id).then(obs => obs.subscribe(position => {
          this.position = position;
          this.mode = 'edit';
          this.title.setValue(position.title);
          this.description.setValue(position.description);
        }));
      }
    });
  }

  get saveDisabled(): boolean {
    return !this.title.valid;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/access/positions']);
  }

  onSaveClick(): void {
    if (this.mode === 'new') {
      this.api.createPosition({title: this.title.value, description: this.description.value})
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Added position ' + this.title.value, 'Ok');
          this.router.navigate(['/rms/access/positions']);
        }));
    } else {
      this.api.updatePosition({id: this.position?.id, title: this.title.value, description: this.description.value})
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Edited position ' + this.title.value, 'Ok');
          this.router.navigate(['/rms/access/positions']);
        }));
    }
  }


}
