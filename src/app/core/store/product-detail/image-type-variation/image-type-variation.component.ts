import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EVariationsType } from '../product-detail-body/product-detail-body.component';

@Component({
  selector: 'app-image-type-variation',
  templateUrl: './image-type-variation.component.html',
  styleUrls: ['./image-type-variation.component.scss'],
})
export class ImageTypeVariationComponent implements OnInit {
  @Input() imageSelected: any;
  @Input() image: any;
  @Output() onSelectVariation = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectImageVariation(image: any) {
    this.onSelectVariation.emit({ type: EVariationsType.image, value: image });
  }
}
