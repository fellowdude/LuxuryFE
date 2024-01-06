import { IAddressInfo, IContactInfo } from './shared.model';

export interface IBenefitDetail {
  text: string;
  title: string;
}

export interface IBenefitData {
  addressList?: IAddressInfo[];
  company_description: string;
  company_images: Array<string>;
  company_videos: Array<string>;
  contactInfo?: IContactInfo;
  desktopBanner: string;
  detail: Array<IBenefitDetail>;
  mobileBanner: string;
  name: string;
  url_attachment: string;
}
