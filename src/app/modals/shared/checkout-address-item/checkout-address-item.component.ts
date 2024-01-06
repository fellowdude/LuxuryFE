import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAddressItem } from 'src/app/models/address.model';

@Component({
  selector: 'app-checkout-address-item',
  templateUrl: './checkout-address-item.component.html',
  styleUrls: ['./checkout-address-item.component.scss']
})
export class CheckoutAddressItemComponent implements OnInit {

  @Input() address: IAddressItem;
  @Input() position: number;
  @Input() profile: boolean = false;
  @Output() onClick = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  radioChange(event): void{
    this.onClick.emit(this.position);
  }
}
