import { IWishList, IWishListItem } from '../models/wishlist.model';

export const wishListItem: IWishListItem = {
  _id: '4bc25dc',
  productId: '123',
  nameProduct: 'Dr. Pepper',
  imageProduct: 'https://via.placeholder.com/100x100',
  price: 20,
  brand: 'Marca',
};

export const wishListItems: IWishList = {
  infoProducts: [wishListItem, wishListItem, wishListItem],
};
