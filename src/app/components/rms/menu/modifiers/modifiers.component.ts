import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ModificationGroup} from '../../../../model/modification-group';
import {Ingredient} from '../../../../model/ingredient';
import {IngredientApiService} from '../../../../api/ingredient-api.service';
import {MatDialog} from '@angular/material/dialog';
import {NewModifierDialogComponent} from '../new-modifier-dialog/new-modifier-dialog.component';
import {Modification} from '../../../../model/modification';

@Component({
  selector: 'app-modifiers',
  templateUrl: './modifiers.component.html'
})
export class ModifiersComponent implements OnInit {

  ingredients: Ingredient[] | undefined;
  @Input() modificationGroups: ModificationGroup[] = [];
  @Output() modificationGroupsChange = new EventEmitter<ModificationGroup[]>();

  constructor(private api: IngredientApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.api.getIngredientsForRecipe().then(obs => obs.subscribe(ingredients => {
      this.ingredients = ingredients;
    }));
  }

  onAddModificationGroupClick(): void {
    this.dialog.open(NewModifierDialogComponent, {width: '600px'})
      .afterClosed().subscribe((modificationGroup: ModificationGroup) => {
        if (!!modificationGroup) {
          this.modificationGroups.push(modificationGroup);
        }
      });
    this.onChange();
  }

  onAddModifierClick(modificationGroup: ModificationGroup): void {
    this.modificationGroups.find(mg => mg === modificationGroup)?.modifications.push({
      id: null,
      name: 'No extra ingredients',
      ingredient: null,
      withoutWriteOff: true,
      quantity: 0,
      price: 0
    });
  }

  onDeleteClick(modificationGroup: ModificationGroup, modification: Modification): void {
    const index = this.modificationGroups.findIndex(mg => mg === modificationGroup);
    this.modificationGroups[index].modifications = this.modificationGroups[index].modifications.filter(m => m !== modification);
    this.onChange();
  }

  onChange(): void {
    this.modificationGroupsChange.emit(this.modificationGroups);
  }

}
