import { Injectable } from '@angular/core';
import { IWishList } from 'src/app/models/wishlist.model';
import { IWishListInfo, WishlistService } from '../wishlist.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistTransformService {
  constructor(private wishlistService: WishlistService) {}

  transformWishList(wishlistInfo: IWishListInfo): IWishList {
    return {
      infoProducts: wishlistInfo.wishlist.map((item) => ({
        _id: item._id,
        productId: item._id,
        nameProduct: item.name,
        imageProduct: wishlistInfo.url_attachment + item.image_cover,
        price: item.price,
        brand: item.brand.name,
        SKU: item.SKU,
        campaignName: item.categories?.[0],
        category: item?.categories?.[0]
      })),
    };
  }
}
