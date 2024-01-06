import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
// import { Subject } from 'rxjs';

interface PositionCoords {
  x: number;
  y: number;
}

@Component({
  selector: 'app-main-image-zoom',
  templateUrl: './main-image-zoom.component.html',
  styleUrls: ['./main-image-zoom.component.scss'],
})
export class MainImageZoomComponent implements OnInit {
  @Input('img') image: string;
  @Input() zoom: number = 2;
  @Input() lenSize: number = 90;
  @Input() imgWidth: number;
  @Input() imgHeigth: number;
  @Input() divZoomed: ElementRef;

  posX: number = 0;
  posY: number = 0;
  cx: number = 1;
  cy: number = 1;
  yet: boolean = false;
  factorX: number;
  factorY: number;

  // private mouseMovement = new Subject();

  @ViewChild('img', { static: false, read: ElementRef }) img: ElementRef;
  @ViewChild('len', { static: false, read: ElementRef }) lens: ElementRef;

  @HostListener('mousemove', ['$event'])
  mouseMove(event: MouseEvent) {
    const result = this.moveLens(event);
    this.render.setStyle(this.divZoomed, 'background-position', result);
  }

  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    this.render.setStyle(this.divZoomed, 'display', 'none');
  }

  onLoad(): void {
    this.render.setStyle(
      this.divZoomed,
      'background-image',
      "url('" + this.image + "')"
    );
    this.render.setStyle(
      this.divZoomed,
      'background-size',
      this.img.nativeElement.width * this.zoom +
        'px ' +
        this.img.nativeElement.height * this.zoom +
        'px'
    );
    this.render.setStyle(this.divZoomed, 'background-repeat', 'no-repeat');
    // this.render.setStyle(
    //   this.divZoomed,
    //   'transition',
    //   'background-position .2s ease-in-out'
    // );

    // width of the image to be zoomed
    // this.factorX = this.img.nativeElement.width;
    // height of the image to be zoomed
    // this.factorY = this.img.nativeElement.height;

    // setTimeout(() => {
    //   this.factorX =
    //     this.imgWidth || this.imgHeigth
    //       ? this.factorX / this.img.nativeElement.width
    //       : 1;
    //   this.factorY =
    //     this.imgWidth || this.imgHeigth
    //       ? this.factorY / this.img.nativeElement.height
    //       : 1;
    //   const dim = (this.divZoomed as any).getBoundingClientRect();
    // this.cx =
    //   (dim.width - this.img.nativeElement.width * this.zoom * this.factorX) /
    //   (this.img.nativeElement.width - this.lens.nativeElement.offsetWidth);

    // this.cy =
    //   (dim.height -
    //     this.img.nativeElement.height * this.zoom * this.factorY) /
    //   (this.img.nativeElement.height - this.lens.nativeElement.offsetHeight);
    // });
  }

  moveLens(e: MouseEvent): string {
    let pos;
    let x: number;
    let y: number;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = this.getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - this.lens.nativeElement.offsetWidth / 2;
    y = pos.y - this.lens.nativeElement.offsetHeight / 2;

    /*prevent the lens from being positioned outside the image:*/
    if (
      x >
      this.img.nativeElement.width - this.lens.nativeElement.offsetWidth
    ) {
      x = this.img.nativeElement.width - this.lens.nativeElement.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }

    /* 
	Leonardo - to don't try to understand this for many hours
	Example:
    The height of the image is 400 and the height of the lens is 100.
    If my cursor is in the coord y: 350 the variable "y" is 300, but...
    if my cursor is in the coord y: 351 the variable "y" is 301, and this is greater...
    than the height of the image minus the height of my lens: 400 - 100 = 300 .
	When this happens, my variable "y" will be 300 to prevent to my lens go out of this component.
	The same with the width of the image and the variable "x"
	*/
    if (
      y >
      this.img.nativeElement.height - this.lens.nativeElement.offsetHeight
    ) {
      y = this.img.nativeElement.height - this.lens.nativeElement.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /*set the position of the lens:*/
    this.posX = x;
    this.posY = y;
    /*display what the lens "sees":*/
    let result = x * -this.zoom + 'px ' + y * -this.zoom + 'px';
    return result;
  }

  getCursorPos(e: MouseEvent): PositionCoords {
    let a: DOMRect,
      x: number = 0,
      y: number = 0;
    // e = e || window.event;
    /*get the x and y positions of the image:*/
    a = this.img.nativeElement.getBoundingClientRect();

    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x, y };
  }

  showZoom(): void {
    this.yet = true;
    this.render.setStyle(this.divZoomed, 'display', 'block');
    this.render.setStyle(
      this.divZoomed,
      'background-image',
      "url('" + this.image + "')"
    );

    this.render.setStyle(
      this.divZoomed,
      'background-size',
      this.img.nativeElement.width * this.zoom +
        'px ' +
        this.img.nativeElement.height * this.zoom +
        'px'
    );

    this.render.setStyle(this.divZoomed, 'background-repeat', 'no-repeat');
    // this.render.setStyle(
    //   this.divZoomed,
    //   'transition',
    //   'background-position .2s ease-in-out'
    // );

    // this.factorX = this.img.nativeElement.width;
    // this.factorY = this.img.nativeElement.height;
  }

  hideZoom(): void {
    this.yet = false;
    this.render.setStyle(this.divZoomed, 'display', 'none');
  }
}
