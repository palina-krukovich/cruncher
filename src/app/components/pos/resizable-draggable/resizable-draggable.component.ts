import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

@Component({
  selector: 'app-resizable-draggable',
  templateUrl: './resizable-draggable.component.html',
  styleUrls: ['./resizable-draggable.component.scss']
})
export class ResizableDraggableComponent implements OnInit, AfterViewInit {

  @Input() width = 0;
  @Input() height = 0;
  @Input() left = 0;
  @Input() top = 0;
  @Input() shape: 'CIRCLE' | 'RECT' = 'RECT';
  @Input() name = '';
  @Input() parentWidth = 0;
  @Input() parentHeight = 0;
  @Output() widthChange = new EventEmitter<number>();
  @Output() heightChange = new EventEmitter<number>();
  @Output() leftChange = new EventEmitter<number>();
  @Output() topChange = new EventEmitter<number>();
  @Output() shapeChange = new EventEmitter<'CIRCLE' | 'RECT'>();

  @ViewChild('box') box: ElementRef | undefined;

  mouse: { x: number, y: number } = {x: 0, y: 0};
  status: Status = Status.OFF;

  private boxPosition: { left: number, top: number } = {left: 0, top: 0};
  private containerPos: { left: number, top: number, right: number, bottom: number } = {left: 0, top: 0, right: 0, bottom: 0};
  private mouseClick: { x: number, y: number, left: number, top: number } = {x: 0, y: 0, left: 0, top: 0};

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadBox();
    this.loadContainer();
  }

  private loadBox(): void {
    const {left, top} = this.box?.nativeElement.getBoundingClientRect();
    this.boxPosition = {left, top};
  }

  private loadContainer(): void {
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    const right = left + this.parentWidth;
    const bottom = top + this.parentHeight;
    this.containerPos = {left, top, right, bottom};
  }

  setStatus(event: MouseEvent, status: number): void {
    if (status === 1) {
      event.stopPropagation();
    } else if (status === 2) {
      this.mouseClick = {x: event.clientX, y: event.clientY, left: this.left, top: this.top};
    } else {
      this.loadBox();
    }
    this.status = status;
    this.onChange();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouse = {x: event.clientX, y: event.clientY};

    if (this.status === Status.RESIZE) {
      this.resize();
    } else if (this.status === Status.MOVE) {
      this.move();
    }
    this.onChange();
  }

  private resize(): void {
    if (this.resizeCondMeet()) {
      this.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
      this.width = this.width - (this.width % 16);
      this.height = this.height - (this.height % 16);
    }
    this.onChange();
  }

  private resizeCondMeet(): boolean {
    return (this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom);
  }

  private move(): void {
    if (this.moveCondMeet()) {
      this.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
      this.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
      this.left = this.left - (this.left % 16);
      this.top = this.top - (this.top % 16);
    }
    this.onChange();
  }

  private moveCondMeet(): boolean {
    const offsetLeft = this.mouseClick.x - this.boxPosition.left;
    const offsetRight = this.width - offsetLeft;
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.height - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft &&
      this.mouse.x < this.containerPos.right - offsetRight &&
      this.mouse.y > this.containerPos.top + offsetTop &&
      this.mouse.y < this.containerPos.bottom - offsetBottom
    );
  }

  toggleShape(): void {
    this.shape = this.shape === 'RECT' ? 'CIRCLE' : 'RECT';
  }

  onChange(): void {
    this.widthChange.emit(this.width);
    this.heightChange.emit(this.height);
    this.leftChange.emit(this.left);
    this.topChange.emit(this.top);
    this.shapeChange.emit(this.shape);
  }

}
