import { IAddressInfo, IContactInfo } from './shared.model';

export interface ICompanyPage {
  _id: string;
  contactInfo?: IContactInfo;
  description: string;
  desktopBanner: string;
  experiences: IExperienceCard[];
  images_link: Array<string>;
  list_address?: IAddressInfo[];
  logo: string;
  name: string;
  url_attachment: string;
  videos_link: Array<string>;
}

export interface IExperienceCard {
  _id?: string;
  backgroundUrl: string;
  link?: string;
  slug?: string;
  subtitle?: string;
  title: string;
  buisness?: string;
}
