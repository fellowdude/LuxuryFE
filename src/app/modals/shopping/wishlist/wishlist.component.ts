import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { IWishList } from 'src/app/models/wishlist.model';
import { HeaderWishlistService } from 'src/app/services/communication/header-wishlist.service';
import { WishlistTransformService } from 'src/app/services/internal/wishlist-transform.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishList: IWishList = { infoProducts: [] };
  loading: boolean = false;

  constructor(
    private wishlistService: WishlistService,
    private modalRef: MDBModalRef,
    private wishlistTransform: WishlistTransformService,
    private headerWishlistService: HeaderWishlistService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  initialize() {
    this.loading = true;
    this.wishlistService.getFavorites().subscribe((wishlistInfo) => {
      this.wishList = this.wishlistTransform.transformWishList(wishlistInfo);
      this.loading = false;
    });
  }

  wishListChange(event: { type: string }) {
    if (event.type === 'remove') {
      this.initialize();
      this.headerWishlistService.setWishlistUpdate({ type: 'UPDATE' });
    }
  }
}
