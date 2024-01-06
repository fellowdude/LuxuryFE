import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHomePage } from 'src/app/resolvers/core/home/home.resolver';
import {
  ICarouselBanner,
  ICarouselImage,
} from '../../models/carousel-banner.model';
import { IBrandCarouselItem } from 'src/app/models/brands-carousel.model';
import { IHowToEnjoy } from 'src/app/models/static-items.model';
import { IProductCard } from 'src/app/models/product-card.model';
import { HomePageService } from 'src/app/services/internal/home-page.service';
import { CardListService } from 'src/app/services/internal/card-list.service';
import { ICardListItem } from 'src/app/models/card-list.model';
import { IPopup } from 'src/app/models/popup.model';
import { PopupTransformService } from 'src/app/services/internal/popup-transform.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IHomePage;
  }
  carouselConfig: ICarouselBanner;
  carouselConfigMobile: ICarouselBanner;
  categoryGroupList: Array<ICardListItem>;
  adsContentHorizontal: ICarouselBanner;
  adsContentVertical: ICarouselBanner;
  adsContentTopLeft: ICarouselBanner;
  adsContentBottomLeft: ICarouselBanner;
  adsContentMobile: Array<ICarouselImage>;
  associatedBrands: Array<IBrandCarouselItem>;
  hteData: Array<IHowToEnjoy>;
  featuredProdList: Array<IProductCard>;
  popupData: IPopup;
  modalRef: MDBModalRef;

  constructor(
    private route: ActivatedRoute,
    private homePageService: HomePageService,
    private cardListService: CardListService,
    private modalService: MDBModalService,
    private popupTransformService: PopupTransformService //private toastrController: ToastrControllerService
  ) {}

  ngOnInit(): void {
    //toastr service use
    //this.toastrController.successToastr(Messages.successLogIn, Messages.successTitle);
    this.carouselConfig = this.homePageService.transformCarouselData(
      this.resolvedData.carouselData,
      true,
      true,
      1,
      false,
      true
    );

    this.carouselConfigMobile = this.homePageService.transformCarouselData(
      this.resolvedData.carouselDataMobile,
      true,
      true,
      1,
      false,
      true
    );

    this.categoryGroupList = this.cardListService.homeCardListFormat(
      this.resolvedData.categoryGroupList
    );

    this.adsContentHorizontal = this.homePageService.transformCarouselData(
      this.resolvedData.adsDataHorizontal
    );

    this.adsContentVertical = this.homePageService.transformCarouselData(
      this.resolvedData.adsDataVertical
    );

    this.adsContentTopLeft = this.homePageService.transformCarouselData(
      this.resolvedData.adsDataTopLeft
    );

    this.adsContentBottomLeft = this.homePageService.transformCarouselData(
      this.resolvedData.adsDataBottomLeft
    );

    this.adsContentMobile = this.homePageService.transformBannerListData(
      this.resolvedData.adsDataMobile.content
    );

    this.associatedBrands = this.homePageService.transformAssociatedBrandsData(
      this.resolvedData.brandsData
    );

    this.hteData = this.homePageService.transformHteData(
      this.resolvedData.howToEnjoyData
    );

    this.featuredProdList = this.homePageService.transformFeaturedProducts(
      this.resolvedData.featuredProducts
    );


    if (this.resolvedData.popupData) {
      this.popupData = this.popupTransformService.transformPopup(
        this.resolvedData.popupData
      );

      if (!sessionStorage.getItem('popup_home')) {
        this.modalRef = this.modalService.show(PopupComponent, {
          animated: true,
          backdrop: true,
          keyboard: true,
          focus: true,
          show: false,
          class:
            'modal-information modal-dialog modal-dialog-centered mw-popup-container',
          containerClass: 'modal fade d-flex justify-content-center d-md-block',
          ignoreBackdropClick: false,
          data: {
            popupData: this.popupData,
          },
        });

        sessionStorage.setItem('popup_home', 'popup_home');
      }
    }
  }
}
