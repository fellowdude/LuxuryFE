import { Component, Input, OnInit } from '@angular/core';
import { ISale } from 'src/app/models/order-detail.model';

@Component({
  selector: 'app-sale-supplier',
  templateUrl: './sale-supplier.component.html',
  styleUrls: ['./sale-supplier.component.scss'],
})
export class SaleSupplierComponent implements OnInit {
  @Input() saleOrder: ISale;
  constructor() {}

  ngOnInit(): void {
  }
}
