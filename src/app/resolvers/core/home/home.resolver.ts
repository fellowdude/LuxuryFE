import { BannerService } from 'src/app/services/banner.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Resolve } from '@angular/router';
import { StaticPageService } from 'src/app/services/static-page.service';
import { catchError, map } from 'rxjs/operators';
import { CarouselService } from 'src/app/services/carousel.service';

@Injectable({
  providedIn: 'root',
})
export class HomeResolver implements Resolve<IHomePage> {
  constructor(
    private bannerService: BannerService,
    private brandService: BrandService,
    private categoryGroupService: CategoryGroupService,
    private productService: ProductService,
    private staticPageService: StaticPageService,
    private carouselService: CarouselService
  ) {}
  resolve(): Observable<IHomePage> {
    return zip(
      this.bannerService.getBanner('banner_home').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.bannerService.getBanner('banner_mobile_home').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.categoryGroupService.getCategoryGroups().pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.brandService.getAssociatedBrands().pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.bannerService.getBanner('ads_home_horizontal').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.bannerService.getBanner('ads_home_vertical').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.bannerService.getBanner('ads_home_top_left').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.bannerService.getBanner('ads_home_bottom_left').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.bannerService.getBanner('ads_mobile_home').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.staticPageService.getStaticPage('como_disfrutar').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.productService.getRandomProducts(15).pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.carouselService
        .getCarouselData('popup_home')
        .pipe(catchError((_) => of(null)))
    ).pipe(
      map(
        ([
          carouselData,
          carouselDataMobile,
          categoryGroupList,
          brandsData,
          adsDataHorizontal,
          adsDataVertical,
          adsDataTopLeft,
          adsDataBottomLeft,
          adsDataMobile,
          howToEnjoyData,
          featuredProducts,
          popupData,
        ]) => {
          const homePage: IHomePage = {
            adsDataHorizontal,
            adsDataVertical,
            adsDataTopLeft,
            adsDataBottomLeft,
            adsDataMobile: adsDataMobile,
            brandsData,
            carouselData: carouselData,
            carouselDataMobile: carouselDataMobile,
            categoryGroupList: categoryGroupList,
            featuredProducts: featuredProducts,
            howToEnjoyData,
            popupData,
          };
          return homePage;
        }
      )
    );
  }
}

export interface IHomePage {
  adsDataHorizontal: any;
  adsDataVertical: any;
  adsDataTopLeft: any;
  adsDataBottomLeft: any;
  adsDataMobile: any;
  brandsData: any;
  carouselData: any;
  carouselDataMobile: any;
  categoryGroupList: any;
  featuredProducts: any;
  howToEnjoyData: any;
  popupData: any;
}
