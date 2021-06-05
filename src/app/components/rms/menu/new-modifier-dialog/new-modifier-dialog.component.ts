import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ModificationGroup} from '../../../../model/modification-group';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-modifier-dialog',
  templateUrl: './new-modifier-dialog.component.html'
})
export class NewModifierDialogComponent implements OnInit {

  modificationGroup: ModificationGroup = {
    id: null,
    name: '',
    type: 'CHOOSE_ONE',
    minNum: 0,
    maxNum: 0,
    modifications: []
  };

  minNumFormControl = new FormControl();
  maxNumFormControl = new FormControl();

  constructor(private dialogRef: MatDialogRef<NewModifierDialogComponent>) {
  }

  ngOnInit(): void {
  }

  get addBtnDisabled(): boolean {
    return !this.modificationGroup.name || this.modificationGroup.name.length === 0
      || (this.modificationGroup.type === 'CHOOSE_MULTIPLE'
        && ((!this.minNumFormControl.valid || !this.maxNumFormControl.valid)
          || (this.modificationGroup.minNum === 0 && this.modificationGroup.maxNum === 0)));
  }

  onAddClick(): void {
    this.dialogRef.close(this.modificationGroup);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
