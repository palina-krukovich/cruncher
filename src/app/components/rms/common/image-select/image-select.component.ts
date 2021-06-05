import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html'
})
export class ImageSelectComponent {

  @Input() file: File | undefined;
  @Input() initialImg: string | undefined;
  @Output() fileChange = new EventEmitter<File | undefined>();
  @Output() initialImgChange = new EventEmitter<string | undefined>();

  filepath: string | undefined;
  formControl = new FormControl();

  constructor() { }

  imagePreview(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.item(0);
    const reader = new FileReader();
    reader.onload = () => {
      this.filepath = reader.result as string;
      if (!!file) {
        this.fileChange.emit(file);
      }
    };
    reader.readAsDataURL(file as Blob);
  }

  removeImage(): void {
    this.filepath = undefined;
    this.fileChange.emit(undefined);
    this.formControl.patchValue(undefined);
    this.initialImg = undefined;
    this.initialImgChange.emit(this.initialImg);
  }

}
