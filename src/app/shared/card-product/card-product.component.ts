import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProductCard } from 'src/app/models/product-card.model';
import { CartService } from 'src/app/services/cart.service';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { Messages } from 'src/app/messages';
import { GtagService } from 'src/app/gtag/gtag.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() product: IProductCard = null;
  @Input() origin: string = null;
  @Input() index: number = 1;
  @Input() categoryId: string;
  @Input() showFlag: boolean = false;
  @Output() onClick = new EventEmitter<any>(true);
  categoryPosition: number = 0;

  loadingProduct: boolean = false;
  constructor(
    private cartService: CartService,
    private headerCartUpdateService: HeaderCartService,
    private toastrService: ToastrControllerService,
    private gtag: GtagService
  ) {}

  ngOnInit(): void {
    this.categoryPosition = this.categoryId
      ? this.product?.categories?.findIndex((cat) => cat._id === this.categoryId)
      : this.product?.categories?.findIndex((cat) => cat.image_stamp !== null);
  }

  addToCart(): void {
    this.product.stock--;
    let cartProduct = {
      id_product: this.product._id,
      product: this.product,
      quantity: 1,
    };
    this.loadingProduct = true;
    this.cartService.createCartItem(cartProduct).subscribe(
      (response) => {
        this.loadingProduct = false;
        this.headerCartUpdateService.setCartUpdate({ type: 'UPDATE' });

        this.gtag.addToCart({
          currency: 'PEN',
          items: [
            {
              id: this.product.sku,
              name: this.product.productName,
              brand: this.product.brand,
              category:
                this.product?.campaignName ||
                this.product?.categories?.[0]?.name,
              category_1:
                this.product?.campaignName ||
                this.product?.categories?.[0]?.name,
              quantity: 1,
              price: this.finalPrice(),
              list_name: this.origin,
              list_position: this.index || 0,
            },
          ],
        });

        //MESSAGE USER
        this.toastrService.successToastr(
          Messages.successProductCartAdd,
          Messages.successTitle
        );
        this.onClick && this.onClick.emit(true);
      },
      (error) => {
        this.loadingProduct = false;
      }
    );
  }

  finalPrice(): number {
    if (this.product.isCampaign) {
      return this.product.campaignPrice;
    }
    if (this.product.isGiftCard) {
      return this.product.giftCardPrice;
    }
    return this.product.specialPrice;
  }

  // getStamp(){
  //   if(this.product?.active_stamp &&  this.product.image_stamp != '' ){
  //     return this.product.image_stamp;
  //   }else if(this.product?.campa)
  // }
}
