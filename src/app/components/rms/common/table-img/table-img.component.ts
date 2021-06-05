import {Component, Input} from '@angular/core';
import {abbreviation} from '../../../../util/string-util';

@Component({
  selector: 'app-table-img',
  templateUrl: './table-img.component.html'
})
export class TableImgComponent {

  @Input() photoURL: string | undefined;
  @Input() color: string | undefined;
  @Input() name: string | undefined;

  constructor() {
  }

  get displayPicture(): boolean {
    return !!this.photoURL;
  }

  get displayColor(): boolean {
    return !this.photoURL && !!this.color;
  }

  get displayDefaultColor(): boolean {
    return !this.photoURL && !this.color;
  }

  get abbr(): string {
    return !!this.name ? abbreviation(this.name) : '';
  }

}
