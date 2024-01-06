import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProductColor } from 'src/app/models/product.model';
import { EVariationsType } from '../product-detail-body/product-detail-body.component';

@Component({
  selector: 'app-color-type-variation',
  templateUrl: './color-type-variation.component.html',
  styleUrls: ['./color-type-variation.component.scss'],
})
export class ColorTypeVariationComponent implements OnInit {
  // @Input() colorSelected: IProductColor = undefined;
  @Input() colorSelected: string = undefined;
  @Input() color:  {
    _id: string,
    value: string,
    description: string,
    active?: boolean
  };
  @Input() variationName: string = undefined;
  @Output() onSelectVariation = new EventEmitter();
  selected: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  selectColor(color:  {
    _id: string,
    value: string,
    description: string,
    active?: boolean
  }) {
    if (color.value !== this.colorSelected) {
        this.selected = true;
        this.onSelectVariation.emit({
          type: 'COLOR',
          value: color.value,
          variationName: this.variationName
        });
    }
    else {
        this.selected = false;
        this.onSelectVariation.emit({
          type: 'COLOR',
          value: null,
          variationName: this.variationName
        });
    }
  }
}
