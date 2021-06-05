import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {abbreviation} from '../../../../util/string-util';

export interface TrashItem {
  id: string;
  name: string;
  photoURL: string;
  color: string;
  deletedAt: Date;
}

export interface TrashDialogData {
  trashItems: TrashItem[];
  title: string;
}

@Component({
  selector: 'app-trash-dialog',
  templateUrl: './trash-dialog.component.html'
})
export class TrashDialogComponent {

  @Output() recoverClick = new EventEmitter<string>();

  displayedColumns: string[] = ['img', 'name', 'deletedAt', 'action'];

  abbr = (name: string) => abbreviation(name);

  constructor(private dialogRef: MatDialogRef<TrashDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrashDialogData) { }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onRecoverClick(item: TrashItem): void {
    this.recoverClick.emit(item.id);
    this.data.trashItems = this.data.trashItems.filter(i => i !== item);
  }

}
