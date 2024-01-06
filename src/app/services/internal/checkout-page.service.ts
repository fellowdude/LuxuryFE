import { Injectable } from '@angular/core';
import { ICartItem, IProductToSend, IResultCoupon } from 'src/app/models/cart.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutPageService {

  constructor() { }

  concatOfObject(objectArray: Array<any>, attributeName: string): string{
    let res: string = null;
    if(objectArray.length > 0){
      res = '';
      objectArray.forEach( (e, index)=>{
        if(index == objectArray.length - 1 && objectArray.length > 1){
          res+= ' y ';
        }else{
          index != 0 && (res+= ', ');
        }
        res+= e[attributeName].replace(/[^a-zA-Z ]/g, "");
      })
    }
    res = res?.toLowerCase();
    return res?.charAt(0).toUpperCase() + res?.slice(1) + '.' || null;
  }

  discountCheckUpStructure( resRaw: Array<ICartItem>, rawCheckUp?: Array<IProductToSend>, showMessage: boolean = true ): Array<ICartItem>{
    rawCheckUp.forEach((product, index) => {
      resRaw[index].discountApply = {
        apply: false,
        message: null,
        proceed: false
      }
      switch(product.origin){
        case 'campaña': {
          if(product.pendding_state || product.reason.length > 0){
            if(!product.is_valid){
              resRaw[index].discountApply = {
                apply: false,
                message: showMessage? this.concatOfObject(product.reason, 'message') || `El ${product.entity.discount_name} se actualizará una vez elegido el medio de pago.` : null,
                proceed: true
              }
            }else{
              resRaw[index].discountApply = {
                apply: true,
                message: showMessage? this.concatOfObject(product.reason, 'message') || `El ${product.entity.discount_name} se actualizará una vez elegido el medio de pago.` : null,
                proceed: true
              }
            }
          }else{
            resRaw[index].discountApply = {
              apply: true,
              message: showMessage? 'Descuento por ' + product.nameCampaign + '.' || 'Descuento por campaña.' : null,
              proceed: true
            }
          }
          break;
        }
        case 'categoria': {
          if(!product.pendding_state && product.is_valid){
            resRaw[index].discountApply = {
              apply: false,
              message: showMessage? 'Descuento por Gift Card. Valide el código antes de continuar.' : null,
              proceed: true
            }
          }else{
            if(product.pendding_state && product.is_valid){
              resRaw[index].discountApply = {
                apply: true,
                message: showMessage? 'Descuento por Gift Card. Valide el código antes de continuar.' : null,
                proceed: false
              }
            }else{
              resRaw[index].discountApply= {
                apply: false,
                message: null,
                proceed: true
              }
            }
          }
          break;
        }
        case 'producto': {
          if(!product.pendding_state && product.is_valid){
            resRaw[index].discountApply = {
              apply: false,
              message: showMessage? 'Descuento de producto.' : null,
              proceed: true
            }
          }else{
            if(product.pendding_state && product.is_valid){
              resRaw[index].discountApply = {
                apply: true,
                message: showMessage? 'Descuento de producto.' : null,
                proceed: false
              }
            }else{
              resRaw[index].discountApply= {
                apply: false,
                message: null,
                proceed: true
              }
            }
          }
          break;
        }
        case 'none': {
          resRaw[index].discountApply.proceed = product.preventNextStep;
          break;
        }
      }
      resRaw[index].total_price = product.price;
    })
    return resRaw;
  }

  cartSupplierStructure( resRaw: Array<ICartItem>, rawCheckUp?: Array<IProductToSend>): Array<ISupplierOrder>{
    let result: Array<ISupplierOrder> = [];
    let raw: Array<ICartItem> = [];
    if(rawCheckUp && rawCheckUp.length > 0){
      raw = this.discountCheckUpStructure(resRaw, rawCheckUp, false);
    }else{
      raw = resRaw;
    }
    let dictionary: any = {};
    raw && raw.forEach((item)=>{
      dictionary[item.info_product.supplier_delivery._id] = {
        delivery_price: null,
        delivery_time: null,
        name: item.info_product.supplier_delivery.name,
        id: item.info_product.supplier_delivery._id,
        products: []
      }
    })
    raw.forEach((item)=>{
      dictionary[item.info_product.supplier_delivery._id].products.push(item)
    })
    result = Object.values(dictionary) as Array<ISupplierOrder>;
    return result;
  }

  checkoutSupplierStructure( resRaw: Array<ICartItem>, rawCheckUp?: Array<IProductToSend>, rawResultCoupon?: IResultCoupon, showMessage: boolean = true ): Array<ISupplierOrder>{
    let result: Array<ISupplierOrder> = [];
    let raw: Array<ICartItem> = []
    if(rawCheckUp && rawCheckUp.length > 0){
      raw = this.discountCheckUpStructure(resRaw, rawCheckUp, showMessage);
    }else{
      raw = resRaw;
    }
    let dictionary: any = {};
    raw && raw.forEach((item)=>{
      dictionary[item.info_product.supplier_delivery._id + item?.method_send?.id] = {
        method_id: item?.method_send?.id,
        delivery_description: item.method_send?.description,
        delivery_price: (item.method_send && item.method_send?.price >= 0)? item?.method_send?.price: - 1,
        delivery_discount: rawResultCoupon?.delivery_coupon?.find( method => { return method.method_id == item?.method_send?.id})?.discount || 0,
        delivery_time: (item.method_send && item.method_send?.rangeMin && item.method_send?.rangeMax)? ((item.method_send.rangeMin === item.method_send.rangeMax)? (item.method_send.rangeMin == 1? '24 horas':(item.method_send.rangeMin + ' días hábiles')):(item.method_send.rangeMin + ' - ' + item.method_send.rangeMax + ' días hábiles')): null,
        name: item.info_product.supplier_delivery.name,
        id: item.info_product.supplier_delivery._id,
        products: [],
        discountError: false
      }
    })
    raw && raw.forEach((item)=>{
      dictionary[item.info_product.supplier_delivery?._id + item?.method_send?.id].products.push(item);
		console.log(item)
      if(!item?.discountApply?.apply && item?.discountApply?.message){
        dictionary[item.info_product.supplier_delivery?._id + item.method_send?.id].discountError = true;
      }
    })
    result = Object.values(dictionary) as Array<ISupplierOrder>;
    return result;
  }

  deliveryTotal( raw: Array<ISupplierOrder> ): number {
    let result: number = 0;
    raw.forEach( (supplier)=> {
      result += supplier.delivery_price
    })
    return result;
  }

  checkProceed( raw: Array<ISupplierOrder> ): boolean {
    raw.forEach((element)=>{
      if(element.discountError){
        return false;
      }
    })
    return true;
  }
}
