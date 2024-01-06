export interface IProductCard {
  _id: string;
  brand: string;
  campaignName?: string;
  campaignPrice?: number;
  discount?: number;
  giftCardName?: string;
  giftCardPrice?: number;
  isCampaign?: boolean;
  isGiftCard?: boolean;
  link: string;
  normalPrice: number;
  productImage: string;
  productName: string;
  image_stamp?: string;
  active_stamp?: boolean;
  specialPrice: number;
  stock: number;
  sku?: string;
  categories?: any;
  campaign?:any;
  isBase?: boolean;
}
