export interface IAddressLdV {
  _id: string;
  name: string;
}

export interface IAddressItem {
  _id?: string;
  address: string;
  amount_total?: number;
  cellphone: string;
  checked?: boolean;
  department: IAddressLdV;
  district: IAddressLdV;
  name: string;
  province: IAddressLdV;
  reference: string;
  type_address: IAddressLdV;
  type_address_ERP?: string;
  ubigeo?: string;
}

export interface IAddressItemCheckout {
  _id?: string;
  address: string;
  amount_total?: number;
  cellphone: string;
  checked?: boolean;
  department: IAddressLdV;
  district: IAddressLdV;
  name: string;
  province: IAddressLdV;
  reference: string;
  suppliersArray: Array<IAddressSupplier>;
  type_address: string;
  type_address_ERP?: string;
  ubigeo?: string;
}

export interface IAddressSupplier {
  _id: string;
  amount: number;
  methods_send: Array<IAddressSupplierMethod>;
  name: string;
}

export interface IAddressSupplierMethod {
  _id: string;
  ubigeo: IUbigeo;
}

export interface IUbigeo {
  active: boolean;
  currency: {
    _id: string;
    code: 'SONR-CURRENCY';
    value: string;
    active: boolean;
    ref1: string;
    ref2: string;
  };
  department: string;
  district: string;
  freeDeliveryApplied: boolean;
  id_department: string;
  id_district: string;
  id_province: string;
  price: number;
  province: string;
  rangeMax: number;
  rangeMin: number;
  ubigeo: string;
  use: boolean;
  _id: string;
}
