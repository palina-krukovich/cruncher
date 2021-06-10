import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClientGroup} from '../../../../model/client-group';
import {ClientGroupApiService} from '../../../../api/client-group-api.service';

@Component({
  selector: 'app-new-client-group',
  templateUrl: './new-client-group.component.html'
})
export class NewClientGroupComponent implements OnInit {

  private clientGroup: ClientGroup | undefined;

  mode: 'new' | 'edit' = 'new';

  name = new FormControl('', Validators.required);
  loyaltyType = new FormControl('DISCOUNT', Validators.required);
  discountRate = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]);

  constructor(private api: ClientGroupApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getClientGroup(id).then(obs => obs.subscribe(clientGroup => {
          this.clientGroup = clientGroup;
          this.mode = 'edit';
          this.name.setValue(clientGroup.name);
          this.loyaltyType.setValue(clientGroup.loyaltyType);
          this.discountRate.setValue(clientGroup.discountRate);
        }));
      }
    });
  }

  get saveDisabled(): boolean {
    return !this.name.valid || !this.loyaltyType.valid || !this.discountRate.valid;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/marketing/client-groups']);
  }

  onSaveClick(): void {
    if (this.mode === 'new') {
      this.api.createClientGroup({name: this.name.value, loyaltyType: this.loyaltyType.value, discountRate: this.discountRate.value})
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Added Customer Group ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/marketing/client-groups']);
        }));
    } else {
      this.api.updateClientGroup({id: this.clientGroup?.id, name: this.name.value, loyaltyType: this.loyaltyType.value, discountRate: this.discountRate.value})
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Edited Customer Group ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/marketing/client-groups']);
        }));
    }
  }

}
