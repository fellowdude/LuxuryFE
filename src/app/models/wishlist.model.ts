export interface IWishListItem {
	_id: string;
	brand: string;
	imageProduct: string;
	nameProduct: string;
	price: number;
	productId: string;
  SKU?: string;
  campaignName?: any;
  category?: any;
}

export interface IWishList {
	infoProducts: IWishListItem[],
}
