import { BannerInternalGroupComponent } from './banners-list/banner-internal-group/banner-internal-group.component';
import { BannerItemComponent } from './banners-list/banner-item/banner-item.component';
import { BannersListComponent } from './banners-list/banners-list.component';
import { BrandBannerComponent } from './brand-banner/brand-banner.component';
import { BrandsCarouselComponent } from './brands-carousel/brands-carousel.component';
import { BrandsCarouselSecondaryComponent } from './brands-carousel-secondary/brands-carousel-secondary.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardItemComponent } from './card-list/card-item/card-item.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardProductComponent } from './card-product/card-product.component';
import { CarouselBannerComponent } from './carousel-banner/carousel-banner.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CartComponent } from '../modals/shopping/cart/cart.component';
import { CategoriesListComponent } from './header/categories-list/categories-list.component';
import { CategoryGroupBannerComponent } from './category-group-banner/category-group-banner.component';
import { CategorySelectComponent } from './category-select/category-select.component';
import { CheckboxModule, IconsModule, ModalModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { EsCardComponent } from './exclusive-services/es-card/es-card.component';
import { ExclusiveServicesComponent } from './exclusive-services/exclusive-services.component';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { ExperiencesCardListComponent } from './experiences-card-list/experiences-card-list.component';
import { FilterListModule } from './filter-list/filter-list.module';
import { FilterMobileComponent } from '../modals/products/filter-mobile/filter-mobile.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalLoadingComponent } from './global-loading/global-loading.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HeaderComponent } from './header/header.component';
import { HowToBuyComponent } from './how-to-buy/how-to-buy.component';
import { HtbCardComponent } from './how-to-buy/htb-card/htb-card.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MagazinePrestigeCardComponent } from './magazine-prestige-card/magazine-prestige-card.component';
import { MagazinePrestigeListComponent } from './magazine-prestige-list/magazine-prestige-list.component';
import { MapCardComponent } from './map/map-card/map-card.component';
import { MapComponent } from './map/map.component';
import { MicroModule } from '../micro/micro.module';
import { MobileCategoriesListComponent } from './header/mobile-categories-list/mobile-categories-list.component';
import { MobileLateralBarComponent } from './header/mobile-lateral-bar/mobile-lateral-bar.component';
import { MobileSearchInputComponent } from './header/mobile-search-input/mobile-search-input.component';
import { ModalsModule } from '../modals/modals.module';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotifierComponent } from './notifier/notifier.component';
import { OptionsComponent } from './product-list/options/options.component';
import { PaginationComponent } from './product-list/pagination/pagination.component';
import { PopupComponent } from './popup/popup.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListMobileMenuComponent } from './product-list-mobile-menu/product-list-mobile-menu.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RouterModule } from '@angular/router';
import { SingleAccordionComponent } from './single-accordion/single-accordion.component';
import { SingleBannerComponent } from './single-banner/single-banner.component';
import { SubtitleHeaderComponent } from './subtitle-header/subtitle-header.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SubtitleBreadcrumbComponent } from './subtitle-breadcrumb/subtitle-breadcrumb.component';
import { CustomNextLinePipe } from './pipes/custom-next-line.pipe';
import { CustomEraseNextLineCharacterPipe } from './pipes/custom-erase-next-line-character.pipe';
import { MultipleBannersComponent } from './multiple-banners/multiple-banners.component';
import { CarouselModule as CarouselModule2 } from 'ngx-owl-carousel-o';
import { ExperiencesListPageableComponent } from './experiences-list-pageable/experiences-list-pageable.component';
import { NewCategoriesListComponent } from './header/new-categories-list/new-categories-list.component';
import { CatalogBrandRedirectComponent } from './catalog-brand-redirect/catalog-brand-redirect.component';
import { CatalogProductRedirectComponent } from './catalog-product-redirect/catalog-product-redirect.component';
import { CatalogCategoryRedirectComponent } from './catalog-category-redirect/catalog-category-redirect.component';
import { CategoryListItemComponent } from './header/category-list-item/category-list-item.component';
import { CountdownBannerComponent } from './countdown-banner/countdown-banner.component';
import { TimerBoxComponent } from './timer-box/timer-box.component';
import { CustomLinkComponent } from './custom-link/custom-link.component';
import { CarouselBannerItemComponent } from './carousel-banner-item/carousel-banner-item.component';

@NgModule({
  declarations: [
    BannerInternalGroupComponent,
    BannerItemComponent,
    BannersListComponent,
    BrandBannerComponent,
    BrandsCarouselComponent,
    BrandsCarouselSecondaryComponent,
    BreadcrumbComponent,
    CardItemComponent,
    CardListComponent,
    CardProductComponent,
    CarouselBannerComponent,
    CategoriesListComponent,
    CategoryGroupBannerComponent,
    CategorySelectComponent,
    ContactInfoComponent,
    EsCardComponent,
    ExclusiveServicesComponent,
    ExperienceCardComponent,
    ExperiencesCardListComponent,
    FooterComponent,
    GlobalLoadingComponent,
    HeaderComponent,
    HowToBuyComponent,
    HtbCardComponent,
    MagazinePrestigeCardComponent,
    MagazinePrestigeListComponent,
    MapCardComponent,
    MapComponent,
    MobileCategoriesListComponent,
    MobileLateralBarComponent,
    MobileSearchInputComponent,
    NotifierComponent,
    OptionsComponent,
    PaginationComponent,
    PopupComponent,
    ProductListComponent,
    ProductListMobileMenuComponent,
    SingleAccordionComponent,
    SingleBannerComponent,
    SubtitleHeaderComponent,
    SubtitleBreadcrumbComponent,
    CustomNextLinePipe,
    CustomEraseNextLineCharacterPipe,
    MultipleBannersComponent,
    ExperiencesListPageableComponent,
    NewCategoriesListComponent,
    CatalogBrandRedirectComponent,
    CatalogProductRedirectComponent,
    CatalogCategoryRedirectComponent,
    CategoryListItemComponent,
    CountdownBannerComponent,
    TimerBoxComponent,
    CustomLinkComponent,
    CarouselBannerItemComponent,
  ],
  exports: [
    BannerInternalGroupComponent,
    BannerItemComponent,
    BannersListComponent,
    BrandBannerComponent,
    BrandsCarouselComponent,
    BrandsCarouselSecondaryComponent,
    BreadcrumbComponent,
    CardListComponent,
    CardProductComponent,
    CarouselBannerComponent,
    CategoryGroupBannerComponent,
    CategoryListItemComponent,
    CategorySelectComponent,
    ContactInfoComponent,
    CountdownBannerComponent,
    CustomEraseNextLineCharacterPipe,
    CustomLinkComponent,
    CustomNextLinePipe,
    ExclusiveServicesComponent,
    ExperiencesCardListComponent,
    ExperiencesListPageableComponent,
    FooterComponent,
    GlobalLoadingComponent,
    HeaderComponent,
    HowToBuyComponent,
    MagazinePrestigeCardComponent,
    MagazinePrestigeListComponent,
    MapComponent,
    MapComponent,
    MultipleBannersComponent,
    NotifierComponent,
    PopupComponent,
    ProductListComponent,
    ProductListMobileMenuComponent,
    SingleAccordionComponent,
    SingleBannerComponent,
    SubtitleBreadcrumbComponent,
    SubtitleHeaderComponent,
    SwiperModule,
  ],
  imports: [
    CarouselModule.forRoot(),
    CarouselModule2,
    CheckboxModule,
    CommonModule,
    FilterListModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    IconsModule,
    LazyLoadImageModule,
    MicroModule,
    ModalModule,
    ModalsModule,
    NgxPaginationModule,
    RatingModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    SwiperModule,
  ],
  entryComponents: [FilterMobileComponent, CartComponent],
})
export class SharedModule {}
