import {Component, OnInit} from '@angular/core';
import {WorkshopApiService} from '../../../../api/workshop-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {Workshop} from '../../../../model/workshop';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-workshop',
  templateUrl: './new-workshop.component.html'
})
export class NewWorkshopComponent implements OnInit {

  private workshop: Workshop | undefined;

  mode: 'new' | 'edit' = 'new';
  name = new FormControl('', Validators.required);

  constructor(private api: WorkshopApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getWorkshop(id).then(obs => obs.subscribe(workshop => {
          this.workshop = workshop;
          this.mode = 'edit';
          this.name.setValue(workshop.name);
        }));
      }
    });
  }

  get saveDisabled(): boolean {
    return !this.name.value;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/menu/workshops']);
  }

  onSaveClick(): void {
    if (this.mode === 'new') {
      this.api.createWorkshop({name: this.name.value}).then(obs => obs.subscribe(() => {
        this.snackBar.open('Added workshop ' + this.name.value, 'Ok');
        this.router.navigate(['/rms/menu/workshops']);
      }));
    } else {
      this.api.updateWorkshop({id: this.workshop?.id, name: this.name.value}).then(obs => obs.subscribe(() => {
        this.snackBar.open('Edited workshop ' + this.name.value, 'Ok');
        this.router.navigate(['/rms/menu/workshops']);
      }));
    }
  }

}
