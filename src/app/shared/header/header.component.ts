import {
  Component,
  OnInit,
  Injectable,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  IHeaderCartUpdate,
  IHeaderWishlistUpdate,
  // IMobileLateralComponent,
} from '../../models/header.model';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { UiService } from '../../services/communication/ui.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CartComponent } from 'src/app/modals/shopping/cart/cart.component';
import { HeaderService } from 'src/app/services/header.service';
import * as hammer from 'hammerjs';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { HeaderWishlistService } from 'src/app/services/communication/header-wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { WishlistComponent } from 'src/app/modals/shopping/wishlist/wishlist.component';
import { MenuAccountComponent } from 'src/app/modals/account/menu-account/menu-account.component';
import { ContactComponent } from 'src/app/modals/contact/contact.component';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { CarouselService } from 'src/app/services/carousel.service';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { UrlService } from 'src/app/services/url.service';
// import { mobileLateralItem } from 'src/app/mockups/header.mockup';

var placeholderText = '¿Qué está buscando?';
export enum MenuName {
  MOBILE_CATEGORY_LIST = 'MOBILE_CATEGORY_LIST',
  CATEGORY_LIST = 'CATEGORY_LIST',
  LATERAL_BAR = 'LATERAL_BAR',
  MOBILE_SEARCH_INPUT = 'MOBILE_SEARCH_INPUT',
}

@Injectable()
export class SwipeHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL, treshold: 50 },
  };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: SwipeHammerConfig,
    },
  ],
})
export class HeaderComponent implements OnInit {
  @ViewChild('categorieList', { static: true })
  categorieList: CategoriesListComponent;
  @ViewChild('subNavbar') subNavbar: ElementRef<HTMLDivElement>;

  @Output() onResponse = new EventEmitter(true);

  openMenu: string | undefined = undefined;
  cartSize: number = 0;
  // configMenuMobile: IMobileLateralComponent;
  darkBlueBackground: boolean;
  wishlistSize: number = 0;
  mobileSearchVisible: boolean = false;
  hasCountdown: boolean = false;
  modalRef: MDBModalRef;
  groupCategoryList: any;
  searchValue: string = '';
  countDownInfo: any = null;
  userInfo: {
    last_name_father: string;
    suffix: string;
  } = null;
  placeholderSearch: string = placeholderText;
  inHome: boolean = true;

  public get menuName(): typeof MenuName {
    return MenuName;
  }

  constructor(
    private carouselService: CarouselService,
    private cartService: CartService,
    private headerCartUpdateService: HeaderCartService,
    private headerService: HeaderService,
    private headerWishlistService: HeaderWishlistService,
    private modalService: MDBModalService,
    private profileService: ProfileService,
    private router: Router,
    private uiService: UiService,
    private urlService: UrlService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // this.configMenuMobile = mobileLateralItem;
    this.amountCart();
    this.amountWishlist();
    this.profileService.getProfile().subscribe((result) => {
      this.userInfo = {
        last_name_father: result.last_name_father,
        suffix: result.suffix,
      };
    });
    this.headerService.getHeaderMenu().subscribe((res) => {
      this.groupCategoryList = res;
    });

    this.uiService.isBlur.subscribe((value) => {
      if (!value) this.closeMenu();
    });

    this.uiService.hasCountdown.subscribe((value) => {
      this.hasCountdown = value;
    });

    this.headerCartUpdateService.cartUpdated
      .pipe()
      .subscribe((response: IHeaderCartUpdate) => {
        if (response.type === 'UPDATE') {
          this.amountCart();
        }
      });

    this.headerWishlistService.wishlistUpdated
      .pipe()
      .subscribe((response: IHeaderWishlistUpdate) => {
        if (response.type === 'UPDATE') {
          this.amountWishlist();
        }
      });

    this.carouselService
      .getCarouselData('contador_header')
      .pipe(
        catchError((_) => {
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response?.content?.length > 0) {
          this.uiService.setHasCountdown(true);
          this.countDownInfo = response?.content;
          this.onResponse.emit(true);
        } else {
          this.uiService.setHasCountdown(false);
          this.onResponse.emit(false);
        }
      });

    this.urlService.inHome$.subscribe((value) => (this.inHome = value));
  }

  toggleMenu(menuName: string | undefined = undefined): void {
    const isMenuNameCategoryList = menuName === this.menuName.CATEGORY_LIST,
      isMenuNameMobileSearchInput =
        menuName === this.menuName.MOBILE_SEARCH_INPUT,
      isCategoryListOpen = this.openMenu === this.menuName.CATEGORY_LIST;

    if (this.openMenu === menuName) {
      this.openMenu = null;
      document.body.style.overflow = 'auto';
      this.uiService.setBlur(false);
    } else if (this.openMenu !== menuName && menuName) {
      this.openMenu = menuName;
      document.body.style.overflow = !isMenuNameMobileSearchInput
        ? 'hidden'
        : 'auto';

      if (isMenuNameCategoryList) {
        this.uiService.setBlur(true);
        document.body.style.overflow = 'auto';
      }
    } else {
      if (isCategoryListOpen) this.uiService.setBlur(false);
      this.openMenu = null;
      document.body.style.overflow = 'auto';
    }
  }

  closeMenu(): void {
    this.openMenu = null;
    document.body.style.overflow = 'auto';
  }

  // logoRedirect() {
  //   this.toggleMenu();
  //   this.router.navigate(['/inicio']);
  // }

  showCart(): void {
    this.toggleMenu();
    this.modalRef = this.modalService.show(CartComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  showWishlist(): void {
    this.toggleMenu();
    this.modalRef = this.modalService.show(WishlistComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  showContact(): void {
    this.toggleMenu();
    this.modalRef = this.modalService.show(ContactComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  showUserMenu(): void {
    this.toggleMenu();
    this.modalRef = this.modalService.show(MenuAccountComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  amountWishlist(): void {
    this.wishlistSize = 0;
    this.wishlistService
      .getTotalWishlist()
      .pipe()
      .subscribe((response: any) => {
        this.wishlistSize = response?.wishlist || 0;
      });
  }

  amountCart(): void {
    this.cartSize = 0;
    this.cartService
      .cartSize()
      .pipe()
      .subscribe((response: any) => {
        this.cartSize = response?.total_item || 0;
      });
  }

  onSwipe(ev: HammerInput & { overallVelocityX: number }): void {
    this.subNavbar.nativeElement.scrollBy({
      behavior: 'smooth',
      left:
        1.5 *
        ev.deltaX *
        ev.overallVelocityX *
        (ev.direction === Hammer.DIRECTION_LEFT ? 1 : -1),
    });
  }

  search(): void {
    if (this.searchValue.trim().length > 0) {
      this.toggleMenu();
      this.router.navigate(['/busqueda', this.searchValue.trim()]);
      this.searchValue = '';
    }
  }

  erasePlaceholder(): void {
    this.placeholderSearch = '';
  }

  readdPlaceholder(): void {
    this.placeholderSearch = placeholderText;
  }
}
