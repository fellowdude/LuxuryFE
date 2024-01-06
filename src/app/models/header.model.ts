export interface IMobileLateralComponent {
  // items: Array<IMobileLateralComplexItem | IMobileLateralSimpleItem>;
  items: IMobileLateralComplexItem[];
  number_card: string;
  profileLastName: string;
}

export interface IMobileLateralSimpleItem {
  function?: Function;
  name: string;
  url: string;
}

export interface IMobileLateralComplexItem {
  // items: Array<IMobileLateralComplexItem | IMobileLateralSimpleItem>;
  className?: string;
  items: IMobileLateralSimpleItem[];
  name: string;
  searchBox?: boolean;
}

export interface IHeaderCartUpdate{
  type: 'UPDATE' | '';
}

export interface IHeaderWishlistUpdate{
  type: 'UPDATE' | '';
}
