export interface ICategoriesGroupType {
  _id: string;
  active: boolean;
  code: string;
  ref1: string;
  value: string;
}

export interface ICategoriesGroupItem {
  _id?: string;
  friendly_url?: string;
  image_app?: string;
  image_web?: string;
  link?: string;
  text?: string;
  name?: string;
  typeGroupCategory?: ICategoriesGroupType;
  url_attachment?: string;
}
export interface IAddressInfo {
  address: string;
  lat: number;
  localName: string;
  long: number;
  phone: string;
  selected: boolean;
}

export interface IDaySchedule {
  day: string;
  time: string;
}

export interface IContactInfo {
  actionsSubmit?: {
    buttonName: string;
    typeButton: string;
    _id: string;
  }[];
  phone: string;
  schedule: Array<IDaySchedule>;
}
