import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html'
})
export class ColorPickerComponent {

  @Input() color: string | undefined;
  @Output() colorChange = new EventEmitter<string>();

  colors = ['default-color', 'pink', 'red', 'orange', 'yellow', 'green', 'mint', 'blue', 'dark-blue', 'purple'];

  constructor() { }

  selectColor(color: string): void {
    this.color = color;
    this.colorChange.emit(color);
  }

}
