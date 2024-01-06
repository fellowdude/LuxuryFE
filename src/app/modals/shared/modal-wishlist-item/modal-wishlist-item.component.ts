import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GtagService } from 'src/app/gtag/gtag.service';
import { Messages } from 'src/app/messages';
import { IWishListItem } from 'src/app/models/wishlist.model';
import { CartService } from 'src/app/services/cart.service';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { ProductUpdateService } from 'src/app/services/communication/product-update.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-modal-wishlist-item',
  templateUrl: './modal-wishlist-item.component.html',
  styleUrls: ['./modal-wishlist-item.component.scss'],
})
export class ModalWishlistItemComponent implements OnInit {
  @Input() wishListItem: IWishListItem;
  @Output() onClick = new EventEmitter<any>();
  loading: boolean = false;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private headerCartService: HeaderCartService,
    private toastrService: ToastrControllerService,
    private productUpdateService: ProductUpdateService,
    private gtag: GtagService
  ) {}

  ngOnInit(): void {}

  addToCart() {
    this.loading = true;
    let cartProduct = {
      id_product: this.wishListItem.productId,
      product: this.wishListItem,
      quantity: 1,
    };
    this.cartService.createCartItem(cartProduct).subscribe(
      (result) => {
        // MESSAGE ADD CART
        this.toastrService.successToastr(
          Messages.successProductCartAdd,
          Messages.successTitle
        );
        this.headerCartService.setCartUpdate({ type: 'UPDATE' });
        this.loading = false;

        this.gtag.addToCart({
          currency: 'PEN',
          items: [
            {
              id: this.wishListItem.SKU,
              name: this.wishListItem.nameProduct,
              brand: this.wishListItem.brand,
              category: 'Wishlist:' + (this.wishListItem?.campaignName?.name || this.wishListItem?.category?.name),
              quantity: 1,
              price: this.wishListItem?.price,
              list_name: "Wishlist",
              list_position: 1
            }
          ]
        });
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  removeItem() {
    this.loading = true;
    this.wishlistService.removeFavorite(this.wishListItem.productId).subscribe(
      (resp) => {
        this.loading = false;
        // MESSAGE REMOVE WISHLIST
        this.toastrService.successToastr(
          Messages.successProductWishlistRemove,
          Messages.successTitle
        );

        this.gtag.removeFromWishlist({
          currency: 'PEN',
          items: [
            {
              id: this.wishListItem.SKU,
              name: this.wishListItem.nameProduct,
              brand: this.wishListItem.brand,
              category: this.wishListItem?.category,
              price: this.wishListItem.price,
              list_name: "Wishlist"
            }
          ]
        });

        this.productUpdateService.setProductUpdate({ type: 'UPDATE' });
        this.onClick.emit({ type: 'remove' });
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
