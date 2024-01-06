import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAdditionalProductItem } from 'src/app/models/checkout.model';

@Component({
  selector: 'app-additional-products-item',
  templateUrl: './additional-products-item.component.html',
  styleUrls: ['./additional-products-item.component.scss']
})
export class AdditionalProductsItemComponent implements OnInit {

  @Input() item: IAdditionalProductItem;
  @Input() onlyOne: boolean = false;
  @Output() onClick = new EventEmitter<any>(true);

  constructor() { }

  ngOnInit(): void {
  }

}
