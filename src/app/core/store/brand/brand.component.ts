import { ActivatedRoute, Router } from '@angular/router';
import { BrandDetailPageService } from 'src/app/services/internal/brand-detail-page.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategorySelectService } from 'src/app/services/internal/category-select.service';
import { Component, OnInit } from '@angular/core';
import { FakeFilterListService } from 'src/app/services/internal/fake-filter-list.service';
import { IBrandDetail } from 'src/app/models/brands.model';
import { IBrandPage } from 'src/app/resolvers/core/store/brand.resolver';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { ICategorySimple } from 'src/app/models/category-page.model';
import {
  IFakeFilterList,
  IFilter,
  IFilterItem,
} from 'src/app/models/filter.model';
import { ISort } from 'src/app/models/product.model';
import { ImageGalleryComponent } from 'src/app/modals/image-gallery/image-gallery.component';
import { InformationModalComponent } from 'src/app/modals/information-modal/information-modal.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ProductService } from 'src/app/services/product.service';
import { StoreTransformService } from 'src/app/services/internal/store-transform.service';
import { PaginationQueryService } from 'src/app/services/internal/pagination-query.service';
import { LdvService } from 'src/app/services/ldv.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data['resolved'] as IBrandPage;
  }

  brandResult: IBrandDetail;
  currentPage: number = 0;
  sortValue: ISort;
  filterApplication: IFilter;
  modalRef: MDBModalRef;
  listCategories: Array<ICategorySimple> = [];
  fakeFilterList: Array<IFakeFilterList> = [];
  filterList: Array<IFilterItem> = [];
  breadcrumb: Array<IBreadcrumbItem>;
  loadingProducts: boolean = false;
  activeFilter: boolean = false;
  filterUsed: any = null;
  filterObject: any = null;
  sortOption: string = '0';
  sortOptions: Array<any>;

  constructor(
    private activeRoute: ActivatedRoute,
    private brandDetPageServ: BrandDetailPageService,
    private brandService: BrandService,
    private categorySelectService: CategorySelectService,
    private fakeFilterListService: FakeFilterListService,
    private storeTransformService: StoreTransformService,
    private productService: ProductService,
    private modalService: MDBModalService,
    private router: Router,
    private paginationQueryService: PaginationQueryService,
    private _ldvService: LdvService
  ) {}

  ngOnInit(): void {
    this._ldvService.getLdvDetailLogged('SORT_OPTION').subscribe(
      (res) => {
        this.sortOptions = res;
      }
    )
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    this.filterUsed = JSON.parse(this.activeRoute.snapshot.queryParamMap.get('filter'))?.filters || null;
    let camp = this.activeRoute.snapshot.params['campaign'];

    if(this.resolvedData.filteredProducts){
      this.brandResult = this.brandDetPageServ.transformBrandInfoWithFilteredProducts(
        this.resolvedData.brandInfo,
        this.resolvedData.filteredProducts,
        urlWithoutParams,
        this.resolvedData?.categoryGroupData?.url_attachment
      );
      this.filterList = this.storeTransformService.transformCategoryFiltersFiltered(
        this.resolvedData.filteredProducts?.filters,
        this.filterUsed
      );
    }else{
      this.brandResult = this.brandDetPageServ.transformBrandInfo(
        this.resolvedData.brandInfo,
        urlWithoutParams,
        this.resolvedData?.categoryGroupData?.url_attachment
      );
      this.filterList = this.storeTransformService.transformCategoryFilters(
        this.resolvedData?.brandInfo?.filters
      );
    }

    this.sortValue = JSON.parse(this.activeRoute.snapshot.queryParamMap.get('sort')) || null;
    if(this.sortValue){
      switch(this.sortValue.filter){
        case 'price':
          this.sortOption = this.sortValue.value === -1? '1':'2';
          break;
        case 'name':
          this.sortOption = this.sortValue.value === -1? '3':'5';
          break;
        case 'discount':
          this.sortOption = '5'
          break;
        default:
          this.sortOption = '0';
          break;
      }
    }
    this.currentPage = Number(this.activeRoute.snapshot.queryParamMap.get('page')) || 1;

    let fullUrl = this.router.url.split('/');
    this.breadcrumb = [
      {
        name:
          this.resolvedData.brandInfo.category?.group?.name ||
          this.resolvedData.categoryGroupData.categoryGroupName,
        link: '/tienda/' + fullUrl[2],
      },
      {
        name: camp
          ? this.resolvedData?.brandInfo?.campaign_name
          : this.resolvedData?.brandInfo?.category?.name,
        link: '/tienda/' + fullUrl[2] + '/' + fullUrl[3] + '/' + fullUrl[4],
      },
      {
        name: this.resolvedData.brandInfo.entity.name,
        link: urlWithoutParams,
      },
    ];

    this.listCategories = [];
    this.listCategories.push(
      ...this.categorySelectService.formatCampaignListToSelect(
        this.resolvedData.campaignsData,
        '/tienda/' + this.activeRoute.snapshot.params['group'] + '/camp/'
      )
    );
    this.listCategories.push(
      ...this.categorySelectService.formatCategoryListToSelect(
        this.resolvedData.categoryGroupData,
        '/tienda/' + this.activeRoute.snapshot.params['group'] + '/categoria/'
      )
    );

    this.fakeFilterList = [];
    if (!this.activeRoute.snapshot.params['campaign']) {
      this.fakeFilterList.push(
        ...this.fakeFilterListService.formatBrandFakeFilterList(
          this.resolvedData.categoryInfo,
          urlWithoutParams,
          this.activeRoute.snapshot.params['category'],
          this.activeRoute.snapshot.params['brand']
        )
      );
    }
  }

  initialize(): void {

    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    this.filterUsed = JSON.parse(this.activeRoute.snapshot.queryParamMap.get('filter'))?.filters || null;

    // HERE GOES FUNCTION
    //this.brandResult = this.internalService.transformBrandInfo(this.brandService.getBrandBySlug(this.brandResult.category,this.brandResult.name,this.currentPage,12));
    this.loadingProducts = true;
    if (!this.activeRoute.snapshot.params.campaign) {
      this.brandService
        .getBrandBySlug(
          this.brandResult.category,
          this.brandResult.friendly_url,
          this.currentPage,
          12,
          this.sortValue
        )
        .subscribe((res) => {
          this.loadingProducts = false;
          this.brandResult = this.brandDetPageServ.transformBrandInfo(
            res,
            urlWithoutParams,
            this.resolvedData?.categoryGroupData?.url_attachment
          );
          this.paginationQueryService.setRouteParams(this.currentPage, this.filterObject, this.sortValue);
        });
    } else {
      this.brandService
        .getCampaignProductsByBrand(
          this.activeRoute.snapshot.params.campaign,
          this.brandResult.friendly_url,
          this.currentPage,
          12,
          this.sortValue
        )
        .subscribe((res) => {
          this.loadingProducts = false;
          this.brandResult = this.brandDetPageServ.transformBrandInfo(res);
          this.paginationQueryService.setRouteParams(this.currentPage, this.filterObject, this.sortValue);
        });
    }

  }

  changePage(event): void {
    this.currentPage = event;
    this.initialize();
  }

  changeSortType(event): void {
    switch (Number(event)) {
      case 1: {
        this.sortValue = { filter: 'price', value: -1 };
        break;
      }
      case 2: {
        this.sortValue = { filter: 'price', value: 1 };
        break;
      }
      case 3: {
        this.sortValue = { filter: 'name', value: 1 };
        break;
      }
      case 4: {
        this.sortValue = { filter: 'name', value: -1 };
        break;
      }
      case 0: {
        this.sortValue = null;
        break;
      }
      case 5: {
        this.sortValue = { filter: 'discount', value: -1 };;
        break;
      }
      default: {
        this.sortValue = null;
        break;
      }
    }
    this.sortOption = event;
    this.currentPage = 1;
    if (this.activeFilter) {
      this.loadFilterProducts();
    } else {
      this.initialize();
    }
  }

  showMediaGalery(): void {
    this.modalRef = this.modalService.show(ImageGalleryComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-information modal-dialog modal-dialog-centered modal-lg',
      containerClass: 'modal fade',
      ignoreBackdropClick: true,
      data: {
        modalTitle: 'Galería',
        imageList: this.brandResult.galery_image,
        videoList: this.brandResult.galery_videos,
        url_attachment: this.brandResult.url_attachment,
      },
    });
  }

  showInformation(): void {
    this.modalRef = this.modalService.show(InformationModalComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-information modal-dialog modal-dialog-centered',
      containerClass: 'modal fade',
      ignoreBackdropClick: false,
      data: {
        modalTitle: 'Información de la marca',
        modalBody: this.brandResult.description,
      },
    });
  }

  sendFilterData(event): void {
    this.activeFilter = false;
    Object.keys(event).forEach((el) => {
      if (event[el]?.used) {
        this.activeFilter = true;
      }
    });
    if (this.activeFilter) {
      this.loadingProducts = true;
      this.filterUsed = event;
      if (!this.activeRoute.snapshot.params.campaign) {
        this.filterObject = {
          filters: event,
          category_id: this.resolvedData?.categoryInfo?.entity._id,
          brand_id: this.resolvedData?.brandInfo?.entity._id,
        };
      } else {
        this.filterObject = {
          filters: event,
          campaign_id: this.resolvedData?.brandInfo?.campaign?._id,
          brand_id: this.resolvedData?.brandInfo?.entity._id,
        };
      }
      if (this.sortValue) this.filterObject.sort = this.sortValue;
      this.currentPage = 1;
      this.loadFilterProducts();
    } else {
      this.brandResult.products.data = this.storeTransformService.transformCategoryProduct(
        this.resolvedData?.brandInfo?.products?.data,
        this.brandResult?.url_attachment
      );
      this.brandResult.products.quantityPage = this.brandResult.products?.quantityPage;
      this.currentPage = 1;
      this.brandResult.products.quantityPage = this.brandResult.products?.totalItem;
      this.filterList = this.storeTransformService.transformCategoryFilters(
        this.resolvedData?.brandInfo?.filters
      );
      this.paginationQueryService.setRouteParams(this.currentPage, null, this.sortValue);
    }
  }

  loadFilterProducts(): void {
    this.loadingProducts = true;
    if (!this.activeRoute.snapshot.params.campaign) {
      this.productService
        .getProductByFilter(
          this.filterObject,
          this.currentPage,
          12,
          this.sortValue
        )
        .subscribe((result: any) => {
          this.brandResult.products.data = this.storeTransformService.transformCategoryProduct(
            result?.products?.data,
            this.brandResult?.url_attachment
          );
          /*this.filterList = this.storeTransformService.transformCategoryFiltersFiltered(
            result?.filters,
            this.filterUsed
          );*/
          this.brandResult.products.quantityPage =
            result?.products?.quantityPage;
          this.brandResult.products.totalItem = result?.products?.totalItem;
          this.loadingProducts = false;
          this.paginationQueryService.setRouteParams(this.currentPage, this.filterObject, this.sortValue);
        });
    } else {
      this.productService
        .getCampaginProductByFilter(
          this.filterObject,
          this.currentPage,
          12,
          this.sortValue
        )
        .subscribe((result: any) => {
          this.brandResult.products.data = this.storeTransformService.transformCategoryProduct(
            result?.products?.data,
            this.brandResult?.url_attachment
          );
          /*this.filterList = this.storeTransformService.transformCategoryFiltersFiltered(
            result?.filters,
            this.filterUsed
          );*/
          this.brandResult.products.quantityPage =
            result?.products?.quantityPage;
          this.brandResult.products.totalItem = result?.products?.totalItem;
          this.loadingProducts = false;
          this.paginationQueryService.setRouteParams(this.currentPage, this.filterObject, this.sortValue);
        });
    }
  }
}
