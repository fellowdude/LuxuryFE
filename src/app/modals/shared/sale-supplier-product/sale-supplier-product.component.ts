import { Component, Input, OnInit } from '@angular/core';
import {ISaleProduct} from 'src/app/models/order-detail.model';

@Component({
  selector: 'app-sale-supplier-product',
  templateUrl: './sale-supplier-product.component.html',
  styleUrls: ['./sale-supplier-product.component.scss']
})
export class SaleSupplierProductComponent implements OnInit {

  @Input() product: ISaleProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
