import {Component, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {WriteOffApiService} from '../../../../api/write-off-api.service';

@Component({
  selector: 'app-new-write-off-reason-dialog',
  templateUrl: './new-write-off-reason-dialog.component.html'
})
export class NewWriteOffReasonDialogComponent implements OnInit {

  name = new FormControl('', Validators.required);
  description = new FormControl('');

  constructor(private dialogRef: MatDialogRef<NewWriteOffReasonDialogComponent>,
              private api: WriteOffApiService) { }

  get saveBtnDisabled(): boolean {
    return !this.name.valid;
  }


  ngOnInit(): void {

  }

  onAddClick(): void {
    this.api.createWriteOffReason({id: null, name: this.name.value, description: this.description.value})
      .then(obs => obs.subscribe(reason => {
        this.dialogRef.close(reason);
      }));
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
