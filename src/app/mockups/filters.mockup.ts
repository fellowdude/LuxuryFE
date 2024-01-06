import {
  IFakeFilter,
  IFakeFilterList,
  IFilterItem,
} from '../models/filter.model';

export const filterCheckbox: IFilterItem = {
  _id: '',
  active: true,
  filter: {
    _id: '',
    binded: true,
    bindedTo: 'marca',
    name: 'Marca',
    type: 'checkbox',
    unit: null,
  },
  value: ['AAAAA', 'BBBBB', 'CCCCCC', 'DDDDD'],
};

export const filterRadial: IFilterItem = {
  _id: '',
  active: true,
  filter: {
    _id: '',
    binded: null,
    bindedTo: null,
    name: 'Cepa',
    type: 'radio',
    unit: null,
  },
  value: ['EEEEE', 'FFFFFF', 'GGGGGG'],
};

export const filterRange: IFilterItem = {
  _id: '',
  active: true,
  filter: {
    _id: '',
    binded: true,
    bindedTo: 'precio',
    name: 'Precio',
    type: 'range',
    unit: 'S/',
  },
  options: {
    ceil: 50,
    floor: 0,
    step: 1,
  },
  value: [],
};

export const filterBoolean: IFilterItem = {
  _id: '',
  active: true,
  filter: {
    _id: '',
    binded: null,
    bindedTo: null,
    name: 'Devolución',
    type: 'boolean',
    unit: null,
  },
  value: [],
};

export const filters: Array<IFilterItem> = [
  filterBoolean,
  filterCheckbox,
  filterRadial,
  filterRange,
];

export const fakeFilter: IFakeFilter = {
  name: 'AAAAAA',
  route: '',
  id: '',
  active: false,
};

export const fakeFilters: Array<IFakeFilter> = [
  fakeFilter,
  fakeFilter,
  fakeFilter,
  fakeFilter,
];

export const fakeFilterListItem: IFakeFilterList = {
  filters: fakeFilters,
  name: 'TEST',
};

export const fakeFilterList: Array<IFakeFilterList> = [
  fakeFilterListItem,
  fakeFilterListItem,
];
