import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GtagService } from 'src/app/gtag/gtag.service';
import { Messages } from 'src/app/messages';
import { ICartBody } from 'src/app/models/cart.model';
import {
  IProductColor,
  IProductDetailPage,
} from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { HeaderWishlistService } from 'src/app/services/communication/header-wishlist.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ITextTypeVariation } from '../text-type-variation/text-type-variation.component';

export enum EVariationsType {
  color = 'Colores',
  image = 'Imagenes',
  size = 'Tallas',
}
var preview = false;
interface IVariationToSelect {
  type: EVariationsType;
  value: any;
}

@Component({
  selector: 'app-product-detail-body',
  templateUrl: './product-detail-body.component.html',
  styleUrls: ['./product-detail-body.component.scss'],
})
export class ProductDetailBodyComponent implements OnInit, OnChanges {
  @Input() productDetail: IProductDetailPage;

  variationProduct: IProductDetailPage = null;
  // colorSelected: IProductColor = undefined;
  correctVariation: boolean = false;
  discount: number;
  hasVariation: boolean = false;
  // imageSelected: string | undefined = undefined;
  isSpecificationsOpen: boolean = false;
  isTechniqueSheetOpen: boolean = false;
  loadingAddCart: boolean = false;
  loadingAddWishlist: boolean = false;
  numbersForSelect: number[];
  quantity: number = 1;
  // sizeSelected: ITextTypeVariation = undefined;
  tempUrlAttachment: string = '';
  variationForm: FormGroup;
  variationOptions: string[] = []

  @Output() onDetailChange = new EventEmitter<any>(true);

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private headerCartService: HeaderCartService,
    private headerWishlistService: HeaderWishlistService,
    private toastrService: ToastrControllerService,
    private wishlistService: WishlistService,
    private gtag: GtagService,
  ) {}

  ngOnInit(): void {
    if(window.location.href.indexOf('preview') != -1){
      preview = true;
    } else {
      preview = false;
    }
    this.tempUrlAttachment = this.productDetail.url_attachment;
    this.discount =
      1 - this.productDetail.special_price / this.productDetail.price;

    if (this.productDetail?.type_variation === 'B') {
      this.hasVariation = true;
      this.correctVariation = false;
      this.variationForm = this.fb.group({});
      for (let value of this.productDetail?.variation_father) {
        this.variationOptions.push(value.variation_name)
        this.variationForm.addControl(
          value.variation_name,
          new FormControl(null, [Validators.required])
        );
      }
    }

    this.setQuantities();

    this.gtag.viewItem([
      {
        id: this.productDetail.SKU,
        name: this.productDetail.name,
        brand: this.productDetail.brand,
        category:
          this.productDetail?.campaignName || this.productDetail?.category,
        price: this.finalPrice(),
        list_name: 'Product Detail',
      },
    ]);
  }

  get variationsType(): typeof EVariationsType {
    return EVariationsType;
  }

  getColorDescription(variationName: string) {
    return this.productDetail.variation_father
            .find(typeVariation => typeVariation.variation_name === variationName)?.value.find( variation =>
              variation.value === this.selectedVariationForm(variationName)
             )?.description
  }

  selectedVariationForm(variationName: string): string {
    return this.variationForm.get(variationName)?.value || null;
  }

  addCartDisabled() {
    if(preview){
      return true;
    }
    if (this.productDetail?.stock && !this.hasVariation) {
      return false;
    } else if (
      this.productDetail?.stock &&
      this.hasVariation &&
      this.correctVariation
    ) {
      return false;
    }

    return true;
  }

  addFavouriteDisabled() {
    if(preview){
      return true;
    }
    if (this.hasVariation && this.correctVariation) {
      return false;
    } else if (!this.hasVariation && !this.correctVariation) {
      return false;
    }
    return true;
  }

  stockGreaterThan100() {
    return this.productDetail?.stock >= 100 ? 100 : this.productDetail?.stock;
  }

  setQuantities(): void {
    this.quantity = 1;
    this.numbersForSelect = [...Array(this.productDetail?.stock).keys()].length
      ? [...Array(this.stockGreaterThan100()).keys()].map((i) => i + 1)
      : [1];
  }

  selectVariation({ type, value, variationName }: any) {
    console.log({ type, value, variationName })
    switch (type) {
      case 'COLOR':
        if (value) {
          this.variationForm
            .get(variationName)
            .setValue(value);
        } else {
          this.variationForm.get(variationName).setValue(null);
        }
        break;
      case 'TEXT':
        if (value) {
          this.variationForm.get(variationName).setValue(value);
        } else {
          this.variationForm.get(variationName).setValue(null);
        }
        break;
    }
    if (this.variationForm.valid) {
      this.variationProduct = this.findVariation();
      if(!this.variationProduct) {
        this.toastrService.errorToastr(
          'No se encontró variación con las opciones seleccionadas',
          Messages.errorTitle
        );
      } else {
        this.setNewValues(this.variationProduct);
      }
    }
  }

  findVariation() {
    let variationValidations: boolean[] = []
    let productFound = null;
    console.log(this.productDetail)
    for( const productVariation of this.productDetail?.variations) {
      for(const variationOption of this.variationOptions)  {

         const item = productVariation.variations.find( e => e.variation_name === variationOption );
         console.log(item)
        console.log(this.selectedVariationForm(variationOption) === item?.value?.value)
         if( this.selectedVariationForm(variationOption) === item?.value?.value ) variationValidations.push(true)
         else variationValidations.push(false)
      }
      console.log(variationValidations)
      if(variationValidations.every( validation => validation === true ))  {
        productFound = productVariation
        break;
      }
      else {
        variationValidations = []
      }
    }
    return productFound;
  }

  setNewValues(variationProduct: any) {
    if (variationProduct) {
      let pDetail = { ...this.productDetail };
      pDetail._id = variationProduct._id;
      pDetail.name = variationProduct.name;
      pDetail.image_cover =
        this.tempUrlAttachment + variationProduct.image_cover;
      pDetail.detail_list = variationProduct.detail_list;
      pDetail.type_variation = variationProduct.type_variation;
      pDetail.price = variationProduct.price;
      pDetail.special_price = variationProduct.special_price;
      if (pDetail.isGiftCard && pDetail.discountRaw)
        pDetail.giftCardPrice =
          variationProduct.special_price - pDetail.discountRaw;
      if (pDetail.isCampaign && variationProduct.campaign_price)
        pDetail.campaignPrice = variationProduct.campaign_price;
      pDetail.stock = variationProduct.stock;
      pDetail.extraImages = variationProduct?.images_link?.map(
        (el) => this.tempUrlAttachment + el[0]
      );
      pDetail.detail_list = variationProduct?.detail_list.map((el) => ({
        ...el,
        isOpen: false,
      }));
      this.onDetailChange.emit({ ...pDetail });
      this.correctVariation = true;
    } else {
      this.correctVariation = false;
    }
  }

  addToCart(): void {
    var cartProduct: ICartBody = {
      id_product: this.productDetail._id,
      product: this.productDetail,
      quantity: Number(this.quantity),
      url_attachment: this.productDetail.url_attachment,
    };
    /* if(this.productDetail?.isCampaign){
      this.googleAnalyticsService.eventEmitter('addCart', 'Producto Campaña', 'Agregado');
    } */
    this.loadingAddCart = true;
    this.cartService
      .createCartItem(cartProduct)
      .pipe()
      .subscribe((response) => {
        this.loadingAddCart = false;
        this.productDetail.stock -= this.quantity;
        if (this.variationProduct?.stock)
          this.variationProduct.stock -= this.quantity;
        this.setQuantities();
        this.headerCartService.setCartUpdate({ type: 'UPDATE' });
        this.toastrService.successToastr(
          Messages.successProductCartAdd,
          Messages.successTitle
        );
        //MESSAGE ADD CART

        this.gtag.addToCart({
          currency: 'PEN',
          items: [
            {
              id: this.productDetail.SKU,
              name: this.productDetail.name,
              brand: this.productDetail.brand,
              category:
                this.productDetail?.campaignName ||
                this.productDetail?.category,
              quantity: Number(this.quantity),
              price: this.finalPrice(),
              list_name: 'Product Detail',
              list_position: 1,
            },
          ],
        });
      });
  }

  addToFavourites(): void {
    this.loadingAddWishlist = true;
    this.wishlistService.addFavorite(this.productDetail._id).subscribe(() => {
      this.headerWishlistService.setWishlistUpdate({ type: 'UPDATE' });
      this.loadingAddWishlist = false;
      this.productDetail.favorited = true;

      this.gtag.addToWishlist({
        currency: 'PEN',
        items: [
          {
            id: this.productDetail.SKU,
            name: this.productDetail.name,
            brand: this.productDetail.brand,
            category:
              this.productDetail?.campaignName || this.productDetail?.category,
            quantity: Number(this.quantity),
            price: this.finalPrice(),
            list_name: 'Product Detail',
          },
        ],
      });

      //MESSAGE ADD WISHLIST
      this.toastrService.successToastr(
        Messages.successProductWishlistAdd,
        Messages.successTitle
      );
    });
  }

  removeFromFavourites(): void {
    this.loadingAddWishlist = true;
    this.wishlistService
      .removeFavorite(this.productDetail._id)
      .subscribe(() => {
        this.headerWishlistService.setWishlistUpdate({ type: 'UPDATE' });
        this.loadingAddWishlist = false;
        this.productDetail.favorited = false;
        this.toastrService.successToastr(
          Messages.successProductWishlistRemove,
          Messages.successTitle
        );

        this.gtag.removeFromWishlist({
          currency: 'PEN',
          items: [
            {
              id: this.productDetail.SKU,
              name: this.productDetail.name,
              brand: this.productDetail.brand,
              category:
                this.productDetail?.campaignName ||
                this.productDetail?.category,
              quantity: Number(this.quantity),
              price: this.finalPrice(),
              list_name: 'Product Detail',
            },
          ],
        });
      });
  }

  finalPrice(): number {
    if (this.productDetail.isCampaign) {
      return this.productDetail.campaignPrice;
    }
    if (this.productDetail.isGiftCard) {
      return this.productDetail.giftCardPrice;
    }
    return this.productDetail.special_price;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productDetail']) {
      this.setQuantities();
    }
  }
}
