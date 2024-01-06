import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-modal-cart-item',
  templateUrl: './modal-cart-item.component.html',
  styleUrls: ['./modal-cart-item.component.scss'],
})
export class ModalCartItemComponent implements OnInit {
  @Input() cartItem: ICartItem;
  @Output() onClick = new EventEmitter<any>();
  productStockList: Array<Number> = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = -10; i < 40; i++) {
      if (
        Number(this.cartItem.quantity) + i > 0 &&
        Number(this.cartItem.quantity) + i <=
          Number(this.cartItem.quantity) + this.cartItem.info_product.stock
      ) {
        this.productStockList.push(Number(this.cartItem.quantity) + i);
      }
    }
  }

  deleteItem(): void {
    this.onClick.emit({
      type: 'delete',
      id: this.cartItem._id,
      idProduct: this.cartItem.id_product,
      quantity: this.cartItem.quantity,
    });
  }

  changeQunatity(): void {
    this.onClick.emit({
      type: 'quantity',
      quantity: this.cartItem.quantity,
      id: this.cartItem._id,
      idProduct: this.cartItem.id_product,
      product: this.cartItem,
    });
  }
}
