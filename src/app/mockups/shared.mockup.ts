import { ICategoriesGroupItem } from '../models/shared.model';
import { IAddressInfo } from '../models/shared.model';
import { IDaySchedule } from '../models/shared.model';
import { IContactInfo } from '../models/shared.model';

const categoriesGropupItem1: ICategoriesGroupItem = {
  friendly_url: 'especiales',
  image_app: '/storage-attachment/95abdf80-7155-11eb-b0b0-03e6b4710b71',
  image_web: '/storage-attachment/f96f6300-72f6-11eb-9165-070b99a51189',
  name: 'Especiales',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  _id: '600f575cf0e788685216ceb1',
  typeGroupCategory: {
    active: true,
    code: 'TYPE-GROUP-CATEGORY',
    ref1: 'product',
    value: 'Producto',
    _id: '5ec2dab40e46382418492e25',
  },
};

const categoriesGropupItem2: ICategoriesGroupItem = {
  friendly_url: 'productos',
  image_app: '',
  image_web: '',
  name: 'Productos',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  _id: '5d28e4b952c9454010afe361',
  typeGroupCategory: {
    active: true,
    code: 'TYPE-GROUP-CATEGORY',
    ref1: 'product',
    value: 'Producto',
    _id: '5ec2dab40e46382418492e25',
  },
};

const categoriesGropupItem3: ICategoriesGroupItem = {
  friendly_url: 'vinos_y_licores',
  image_app: '',
  image_web: '',
  name: 'Vinos y Licores',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  _id: '5f47428aec508a3360711643',
  typeGroupCategory: {
    active: true,
    code: 'TYPE-GROUP-CATEGORY',
    ref1: 'product',
    value: 'Producto',
    _id: '5ec2dab40e46382418492e25',
  },
};

const categoriesGropupItem4: ICategoriesGroupItem = {
  friendly_url: 'supermarket',
  image_app: '',
  image_web: '/storage-attachment/d3109410-7155-11eb-b0b0-03e6b4710b71',
  name: 'SuperMarket',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  _id: '5ec2e50553255b4d388e1b38',
  typeGroupCategory: {
    active: true,
    code: 'TYPE-GROUP-CATEGORY',
    ref1: 'product',
    value: 'Producto',
    _id: '5ec2dab40e46382418492e25',
  },
};

const categoriesGropupItem5: ICategoriesGroupItem = {
  friendly_url: 'experiencias',
  image_app: '',
  image_web: '/storage-attachment/fa31c760-7882-11eb-bc45-d1757625eb0b',
  name: 'Experiencias',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  _id: '5d28b782d65db315e0b6722c',
  typeGroupCategory: {
    active: true,
    code: 'TYPE-GROUP-CATEGORY',
    ref1: 'experience',
    value: 'Experiencia',
    _id: '5ec2dab40e46382418492e26',
  },
};

const categoriesGropupItem6: ICategoriesGroupItem = {
  friendly_url: 'galeria_de_arte',
  image_app: '',
  image_web: '/storage-attachment/ebbaaef0-7d09-11eb-9257-9532604a4f8d',
  name: 'Galería de Arte',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  _id: '5ec2f36a53255b4d388e1b3f',
  typeGroupCategory: {
    active: true,
    code: 'TYPE-GROUP-CATEGORY',
    ref1: 'experience',
    value: 'Experiencia',
    _id: '5ec2dab40e46382418492e26',
  },
};

const categoriesGropupItem7: ICategoriesGroupItem = {
  friendly_url: 'prueba_de_gc',
  image_app: '',
  image_web: '/storage-attachment/e57dd9e0-7d09-11eb-9257-9532604a4f8d',
  name: 'Prueba de GC',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  _id: '6049466b0185d405ff6f901d',
  typeGroupCategory: {
    active: true,
    code: 'TYPE-GROUP-CATEGORY',
    ref1: 'product',
    value: 'Producto',
    _id: '5ec2dab40e46382418492e25',
  },
};

export const categoriesGroupList = [
  categoriesGropupItem1,
  categoriesGropupItem6,
  categoriesGropupItem6,
  categoriesGropupItem4,
  categoriesGropupItem5,
  categoriesGropupItem6,
  categoriesGropupItem7,
];

const addressItem1: IAddressInfo = {
  address: 'Av Paseo de la República 355, Chorrillos 15064',
  lat: -12.172076450678386,
  long: -77.01315263047135,
  localName: 'Plaza Lima Sur',
  phone: '123456789',
  selected: false,
};

const addressItem2: IAddressInfo = {
  address: 'Av. Gral. Salaverry 2370, Jesús María 15076',
  lat: -12.08928356110239,
  long: -77.05302328074417,
  localName: 'Real Plaza Salaverry',
  phone: '123456789',
  selected: false,
};

const addressItem3: IAddressInfo = {
  address:
    'Avenida Javier Prado Este 4200, C.C Jockey Plaza, Santiago de Surco 15023',
  lat: -12.085655254641498,
  long: -76.97655936766098,
  localName: 'Jockey Plaza',
  phone: '123456789',
  selected: false,
};

export const addressList: Array<IAddressInfo> = [
  addressItem1,
  addressItem2,
  addressItem3,
];

const day1: IDaySchedule = {
  day: 'Lunes a Viernes',
  time: '9:00 a.m. a 7:30 p.m.',
};

const day2: IDaySchedule = {
  day: 'Sábado',
  time: '10:00 a.m. a 5:00 p.m.',
};

const day3: IDaySchedule = {
  day: 'Domingo',
  time: '10:00 a.m. a 2:00 p.m.',
};

export const contactInfo: IContactInfo = {
  schedule: [day1, day2, day3],
  phone: '01 6185 060',
};
