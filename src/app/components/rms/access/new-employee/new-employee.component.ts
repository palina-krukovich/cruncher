import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PositionApiService} from '../../../../api/position-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EmployeeApiService} from '../../../../api/employee-api.service';
import {Employee} from '../../../../model/employee';
import {Position} from '../../../../model/position';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html'
})
export class NewEmployeeComponent implements OnInit {

  employee: Employee | undefined;
  positions: Position[] = [];


  mode: 'new' | 'edit' = 'new';

  name = new FormControl('', Validators.required);
  gender = new FormControl('MALE');
  phone = new FormControl('');
  email = new FormControl('', [Validators.email, Validators.required]);
  address = new FormControl('');
  position = new FormControl('-', Validators.required);
  password = new FormControl('');
  rms = new FormControl(false);
  pos = new FormControl(false);
  kds = new FormControl(false);

  constructor(private api: EmployeeApiService,
              private positionApi: PositionApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getEmployee(id).then(obs => obs.subscribe(employee => {
          this.employee = employee;
          this.mode = 'edit';
          this.name.setValue(employee.name);
          this.gender.setValue(employee.gender);
          this.phone.setValue(employee.phone);
          this.email.setValue(employee.email);
          this.address.setValue(employee.address);
          this.position.setValue(employee.position?.id);
          this.rms.setValue(employee.rms);
          this.pos.setValue(employee.pos);
          this.kds.setValue(employee.kds);
        }));
      }
    });
    this.positionApi.getPositions().then(obs => obs.subscribe(positions => this.positions = positions));
  }

  get saveDisabled(): boolean {
    return !this.name.valid || !this.email.valid || !this.position.valid || (!this.password.value && this.mode === 'new');
  }

  onBackClick(): void {
    this.router.navigate(['/rms/access/employees']);
  }

  onSaveClick(): void {
    const employee = {
      id: this.employee?.id,
      name: this.name.value,
      gender: this.gender.value,
      phone: this.phone.value,
      email: this.email.value,
      address: this.address.value,
      positionId: this.position.value,
      rms: this.rms.value,
      pos: this.pos.value,
      kds: this.kds.value,
      password: this.password.value
    };
    if (this.mode === 'new') {
      this.api.createEmployee(employee)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Added employee ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/access/employees']);
        }));
    } else {
      this.api.updateEmployee(employee)
        .then(obs => obs.subscribe(() => {
          this.snackBar.open('Edited employee ' + this.name.value, 'Ok');
          this.router.navigate(['/rms/access/employees']);
        }));
    }
  }

}
