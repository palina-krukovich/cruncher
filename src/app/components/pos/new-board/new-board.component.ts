import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HallApiService} from '../../../api/hall-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Hall} from '../../../model/hall';

export interface HallRequest {
  id: string;
  name: string;
  tables: DiningTableRequest[];
}

export interface DiningTableRequest {
  id: string | null;
  name: string;
  capacity: number;
  shape: 'CIRCLE' | 'RECT';
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {

  mode: 'new' | 'edit' = 'new';
  private hall: Hall | undefined;

  hallName = new FormControl('', Validators.required);
  tables: DiningTableRequest[] = [];
  selectedTable: DiningTableRequest | undefined;
  capacities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  tableNumberCounter = 1;

  @ViewChild('box_container') boxContainer: ElementRef | undefined;

  constructor(private api: HallApiService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (!!id) {
        this.api.getHall(id).then(obs => obs.subscribe(hall => {
          this.hall = hall;
          this.mode = 'edit';
          this.hallName.setValue(hall.name);
          const ind = Math.min(this.boxContainerWidth, this.boxContainerHeight);
          this.tables = hall.tables.map(table => ({
            id: table.id,
            name: table.name,
            capacity: table.capacity,
            shape: table.shape,
            x: table.x * ind,
            y: table.y * ind,
            width: table.width * ind,
            height: table.height * ind,
          }));
        }));
      }
    });
  }

  get saveDisabled(): boolean {
    return !this.hallName.valid ||
      this.tables.filter(table => !table.name || !table.capacity || !table.height || !table.width).length > 0;
  }

  get boxContainerWidth(): number {
    return this.boxContainer?.nativeElement.offsetWidth || 0;
  }

  get boxContainerHeight(): number {
    return this.boxContainer?.nativeElement.offsetHeight || 0;
  }

  onAddTableClick(): void {
    this.tables.push({
      id: null,
      name: this.tableNumberCounter.toString(),
      capacity: 1,
      shape: 'RECT',
      x: 0,
      y: 0,
      width: 48,
      height: 48
    });
    this.tableNumberCounter++;
  }

  selectTable(table: DiningTableRequest): void {
    this.selectedTable = table;
  }

  onSaveClick(): void {
    const ind = Math.min(this.boxContainerWidth, this.boxContainerHeight);
    for (const table of this.tables) {
      table.width /= ind;
      table.height /= ind;
      table.x /= ind;
      table.y /= ind;
    }
    const hall = {
      id: this.hall?.id,
      name: this.hallName.value,
      tables: this.tables
    };
    if (this.mode === 'new') {
      this.api.createHall(hall).then(obs => obs.subscribe(() => {
        this.snackBar.open('Created hall map ' + this.hallName.value, 'Ok');
        this.router.navigate(['/pos/board']);
      }));
    } else {
      this.api.updateHall(hall).then(obs => obs.subscribe(() => {
        this.snackBar.open('Edited hall map ' + this.hallName.value, 'Ok');
        this.router.navigate(['/pos/board']);
      }));
    }
  }

}
