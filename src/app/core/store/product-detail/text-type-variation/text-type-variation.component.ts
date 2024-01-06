import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-type-variation',
  templateUrl: './text-type-variation.component.html',
  styleUrls: ['./text-type-variation.component.scss'],
})
export class TextTypeVariationComponent implements OnInit {
  @Input() textVariationSelected: string = undefined ;
  @Input() textVariation: {
    _id: string,
    value: string,
    description: string,
    active: boolean
  };
  @Input() variationName: string;
  @Output() onSelectVariation = new EventEmitter();
  selected: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  selectTextVariation(textVariation: 
    {
    _id: string,
    value: string,
    description: string,
    active: boolean
  }
    ) {
      console.log(textVariation.value,  this.textVariationSelected)
    if (textVariation.value !== this.textVariationSelected) {
        this.selected = true;
        this.onSelectVariation.emit({
          type: 'TEXT',
          value: textVariation.value,
          variationName: this.variationName
        });
    }
    else {
        this.selected = false;
        this.onSelectVariation.emit({
          type: 'TEXT',
          value: null,
          variationName: this.variationName
        });
    }
  }
}

export interface ITextTypeVariation {
  value: string;
  active: boolean;
}
