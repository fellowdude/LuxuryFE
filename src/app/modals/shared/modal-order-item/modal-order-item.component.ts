import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IOrder, OrderStatus } from 'src/app/models/orders-history.model';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { GtagService } from 'src/app/gtag/gtag.service';
import { ICart } from 'src/app/models/cart.model';
import { Messages } from 'src/app/messages';


@Component({
  selector: 'app-modal-order-item',
  templateUrl: './modal-order-item.component.html',
  styleUrls: ['./modal-order-item.component.scss'],
})
export class ModalOrderItemComponent implements OnInit {
  @Input() order: IOrder;
  @Input() cart: number = 0;
  @Input() history: boolean = false;
  @Output() onClick = new EventEmitter<any>(true);
  products: any = [];

  constructor(
    private gtag: GtagService,
    private cartService: CartService,
    private profileService: ProfileService,
    private productService: ProductService,
    private toastrService: ToastrControllerService,
    private headerCartUpdateService: HeaderCartService,
  ) { }

  getStatusClass(status: OrderStatus): string {
    let classes: string = '';

    if (status === OrderStatus.Rejected) {
      classes += ` ${'text-danger'}`;
    } else {
      classes += ` ${'text-primary'}`;
    }

    return classes;
  }

  ngOnInit(): void {
    // this.initializeCart();
    // console.log("this.cart", this.cart)
  }

  initializeCart(): void {
    this.cartService.cartSize().subscribe((res) => {
      this.cart = res.total_item;
      // console.log("res.total_item", res.total_item)
    });
  }

  sendOrderDetail(): void {
    this.onClick.emit(this.order);
  }

  finalPrice(product: any): number {
    if (product.isCampaign) {
      return product.campaignPrice;
    }
    if (product.isGiftCard) {
      return product.giftCardPrice;
    }
    return product.specialPrice;
  }

  retrieveOrder(order: any): void {
    // Obtener productos
    this.profileService.getOrderInfo(order._id).subscribe((res) => {
      res.detail.forEach(item => {
        //listIds.push(item.product_id._id);
        this.productService.getProductById(item.product_id._id).subscribe((product) => {
          // this.products.push(res);
          this.addToCart(product)
        });
      });
    });
  }

  addToCart(product: any) {
    // Asignacion a carrito de compras producto por producto
    product.stock--;

    if (product.stock >= 0) {
      let cartProduct = {
        id_product: product._id,
        product: product,
        quantity: 1,
      };
      // this.loadingProduct = true;
      this.cartService.createCartItem(cartProduct).subscribe(
        (response) => {
          // this.loadingProduct = false;
          this.headerCartUpdateService.setCartUpdate({ type: 'UPDATE' });

          this.gtag.addToCart({
            currency: 'PEN',
            items: [
              {
                id: product.sku,
                name: product.productName,
                brand: product.brand,
                category:
                  product?.campaignName ||
                  product?.categories?.[0]?.name,
                category_1:
                  product?.campaignName ||
                  product?.categories?.[0]?.name,
                quantity: 1,
                price: this.finalPrice(product),
                list_name: "",
                list_position: 0,
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
          // this.loadingProduct = false;
          console.log("Ocurrio un error")
        }
      );

      location.reload();
    }
  }

}
