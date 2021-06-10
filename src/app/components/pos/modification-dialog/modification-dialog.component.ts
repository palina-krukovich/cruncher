import {Component, Inject, Input, OnInit} from '@angular/core';
import {MenuItem, MenuItemModification, MenuItemModificationGroup} from '../../../model/menu-item';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface SelectedModificationGroup {
  modificationGroup: MenuItemModificationGroup;
  modifications: {
    modification: MenuItemModification,
    selected: boolean
  }[];
  modification: MenuItemModification | null;
}

@Component({
  selector: 'app-modification-dialog',
  templateUrl: './modification-dialog.component.html',
  styleUrls: ['./modification-dialog.component.scss']
})
export class ModificationDialogComponent implements OnInit {

  selectedModifications: SelectedModificationGroup[] = [];

  constructor(private dialogRef: MatDialogRef<ModificationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MenuItem) {
    this.selectedModifications = this.data.modificationGroups.map(modificationGroup => ({
      modificationGroup,
      modifications: modificationGroup.type === 'CHOOSE_MULTIPLE' ? modificationGroup.modifications.map(modification => ({
        modification,
        selected: false
      })) : [],
      modification: null
    }));
  }

  ngOnInit(): void {

  }

  get totalPrice(): number {
    return this.data.price + this.selectedModifications
      .map(selectedModification => selectedModification.modificationGroup.type === 'CHOOSE_ONE'
        ? (selectedModification.modification?.price || 0)
        : selectedModification.modifications
          .map(modification => modification.selected
            ? modification.modification.price
            : 0)
          .reduce((x, y) => x + y, 0))
      .reduce((x, y) => x + y, 0);
  }

  onAddClick(): void {
    const modifications: MenuItemModification[] = [];
    this.selectedModifications.filter(selectedModification => selectedModification.modificationGroup.type === 'CHOOSE_ONE')
      .forEach(selectedModification => {
        if (!!selectedModification.modification) {
          modifications.push(selectedModification.modification);
        }
      });
    this.selectedModifications.filter(selectedModification => selectedModification.modificationGroup.type === 'CHOOSE_MULTIPLE')
      .forEach(selectedModification => {
        for (const modification of selectedModification.modifications) {
          if (modification.selected) {
            modifications.push(modification.modification);
          }
        }
      });
    this.dialogRef.close(modifications);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
