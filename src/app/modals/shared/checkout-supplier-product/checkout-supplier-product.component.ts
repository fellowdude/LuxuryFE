import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GtagService } from 'src/app/gtag/gtag.service';
import { ICartItem } from 'src/app/models/cart.model';
import {ISupplierOrder} from 'src/app/models/supplier-order.model';

@Component({
  selector: 'app-checkout-supplier-product',
  templateUrl: './checkout-supplier-product.component.html',
  styleUrls: ['./checkout-supplier-product.component.scss']
})
export class CheckoutSupplierProductComponent implements OnInit {

  @Input() supplierOrder: ISupplierOrder;
  @Input() product: ICartItem;
  @Input() isSummary: boolean;
  @Output() onClick = new EventEmitter<any>();
  productStockList: Array<Number> = [];

  constructor(private gtag: GtagService) { }

  ngOnInit(): void {
    for(let i = -10; i < 40; i++){
      if(Number(this.product.quantity) + i > 0 && Number(this.product.quantity) + i <= Number(this.product.quantity) + this.product.info_product.stock){
        this.productStockList.push(Number(this.product.quantity) + i)
      }
    }
  }

  deleteItem(): void{
    this.onClick.emit({ type: 'delete', id: this.product._id, idProduct: this.product.id_product, quantity: this.product.quantity  })
    this.gtag.removeFromCart({
      currency: 'PEN',
      items: [
        {
          id: this.product?.info_product?.SKU,
          name: this.product?.name_product,
          brand: this.product?.info_product?.brand?.name,
          quantity: Number(this.product.quantity),
          price: this.product.total_price,
          list_name: "Checkout"
        }
      ]
    });
  }

  changeQunatity():void{
    this.onClick.emit({ type: 'quantity', quantity: this.product.quantity, id: this.product._id, idProduct: this.product.id_product });
    this.gtag.addToCart({
      currency: 'PEN',
      items: [
        {
          id: this.product?.info_product?.SKU,
          name: this.product?.name_product,
          brand: this.product?.info_product?.brand?.name,
          quantity: Number(this.product.quantity),
          price: this.product.total_price,
          list_name: "Checkout",
          list_position: 1
        }
      ]
    });
  }

  finalPrice(): number {
    return this.product?.info_product?.special_price
  }

}
