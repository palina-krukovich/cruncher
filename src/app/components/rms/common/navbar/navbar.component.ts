import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

export interface Column {
  name: string;
  selected: boolean;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  @Input() title = '';
  @Input() trashEnabled = false;
  @Input() columnsEnabled = false;
  @Input() exportEnabled = false;
  @Input() importEnabled = false;
  @Input() printEnabled = false;
  @Input() dateRangeEnabled = false;
  @Input() addEnabled = false;
  @Input() backEnabled = false;
  @Input() columns: Column[] | undefined;
  @Input() dateRange: DateRange | undefined;
  @Output() columnsChange = new EventEmitter<Column[]>();
  @Output() dateRangeChange = new EventEmitter<DateRange>();
  @Output() trashClick = new EventEmitter();
  @Output() printClick = new EventEmitter();
  @Output() exportClick = new EventEmitter();
  @Output() importClick = new EventEmitter();
  @Output() addClick = new EventEmitter();
  @Output() backClick = new EventEmitter();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() {
  }

  ngOnInit(): void {
    if (this.dateRangeEnabled) {
      this.range.get('start')?.setValue(this.dateRange?.startDate);
      this.range.get('end')?.setValue(this.dateRange?.endDate);

      this.range.valueChanges.subscribe(() => {
        this.dateRangeChange.emit({
          startDate: this.range.get('start')?.value,
          endDate: this.range.get('end')?.value
        });
      });
    }
  }
}
