import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Client} from '../../../../model/client';
import {ClientGroup} from '../../../../model/client-group';
import {ClientApiService} from '../../../../api/client-api.service';
import {ClientGroupApiService} from '../../../../api/client-group-api.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html'
})
export class NewClientComponent implements OnInit {

  client: Client | undefined;
  clientGroups: ClientGroup[] = [];


  mode: 'new' | 'edit' = 'new';

  name = new FormControl('', Validators.required);
  clientGroupId = new FormControl('-', Validators.required);
  discountRate = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]);
  gender = new FormControl('MALE', Validators.required);
  email = new FormControl('', [Validators.email, Validators.required]);
  phone = new FormControl('');
  birthday = new FormControl('');
  address = new FormControl('');
  cardNumber = new FormControl('');
  comment = new FormControl('');


  constructor(private api: ClientApiService,
              private clientGroupApi: ClientGroupApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getClient(id).then(obs => obs.subscribe(client => {
          this.client = client;
          this.mode = 'edit';
          this.name.setValue(client.name);
          this.clientGroupId.setValue(client.clientGroup.id);
          this.discountRate.setValue(client.discountRate);
          this.gender.setValue(client.gender);
          this.email.setValue(client.email);
          this.phone.setValue(client.phone);
          this.birthday.setValue(client.birthday);
          this.address.setValue(client.address);
          this.cardNumber.setValue(client.cardNumber);
          this.comment.setValue(client.comment);
        }));
      }
    });
    this.clientGroupApi.getClientGroups().then(obs => obs.subscribe(clientGroups => this.clientGroups = clientGroups));
  }

  get saveDisabled(): boolean {
    return !this.name.valid || !this.email.valid || !this.clientGroupId.valid || !this.discountRate.valid;
  }

  onBackClick(): void {
    this.router.navigate(['/rms/marketing/clients']);
  }

  onSaveClick(): void {
    const client = {
      id: this.client?.id,
      name: this.name.value,
      gender: this.gender.value,
      phoneNumber: this.phone.value,
      email: this.email.value,
      birthday: this.birthday.value,
      address: this.address.value,
      cardNumber: this.cardNumber.value,
      comment: this.comment.value,
      discountRate: this.discountRate.value,
      clientGroupId: this.clientGroupId.value
    };
    if (this.mode === 'new') {
      this.api.createClient(client)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Added customer ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/marketing/clients']);
        }));
    } else {
      this.api.updateClient(client)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Edited customer ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/marketing/clients']);
        }));
    }
  }
}
