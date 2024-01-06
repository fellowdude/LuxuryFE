export interface IFilter{
  bindedTo: string;
  filter_id: string;
  type: string;
  used: boolean;
  value: Array<any>;
}

export interface IFilterItem{
  _id: string;
  active: boolean;
  filter: {
    _id: string;
    binded: boolean;
    bindedTo: string;
    name: string;
    type: 'boolean' | 'checkbox' | 'range' | 'radio';
    unit?: string;
  };
  options?: {
    ceil: number;
    floor: number;
    step: number;
  };
  value?: Array<any>;
  contrast?: Array<boolean> | boolean | Array<number>;
}

export interface IFilterSelectOptions{
  name: any;
  toggle: boolean;
}

export interface IFakeFilter {
  active: boolean;
  id: string;
  name: string;
  route: string;
}

export interface IFakeFilterList {
  filters: Array<IFakeFilter>,
  name: string
}

export interface ISearchFilters{
  brands: {
    active: boolean;
    value: string;
  }[];
  price: {
    ceil: number;
    floor: number;
  }
}
