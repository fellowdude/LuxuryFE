import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/models/orders-history.model';
import { ISale } from 'src/app/models/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  transformOrderHistory(orders): IOrder[] {
    var ordersHistory: IOrder[] = [];
    orders.forEach(el => {
      ordersHistory.push({
        _id: el._id,
        date: new Date(el.create_date).toLocaleDateString('en-GB'),
        orderNumber: el.code,
        productsQuantity: el.products,
        status: el.status_order.value,
        totalPrice: el.amount_total
      })
    });
    return ordersHistory;
  }

  transformOrderDetail(order): ISale[] {
    let result: ISale[];
    let dictionary: any = {};
    order.detail.forEach(el => {
      dictionary[el.supplier] = {
        supplierName: el.product_id.supplier.name,
        shippingCost: el.delivery,
        deliveryTime: el.max_range === el.min_range ? el.max_range : el.min_range + ' - ' + el.max_range,
        products: []
      }
    });
    order.detail.forEach(el => {
      dictionary[el.supplier].products.push({
        nameProduct: el.product_name,
        price: el.amount_total,
        brand: el.product_id.brand.name,
        imageProduct: 'https://luxurysass.sfo2.digitaloceanspaces.com' + el.product_id.image_cover
      })
    });
    result = Object.values(dictionary) as ISale[];
    return result;
  }

}
