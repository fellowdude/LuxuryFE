import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICampaignPage } from 'src/app/models/campaign.model';
import { ICategorySimple } from 'src/app/models/category-page.model';
import { IFakeFilterList } from 'src/app/models/filter.model';
import { ISort } from 'src/app/models/product.model';
import { IStoreCampaignPage } from 'src/app/resolvers/core/store/campaign.resolver';
import { CategorySelectService } from 'src/app/services/internal/category-select.service';
import { FakeFilterListService } from 'src/app/services/internal/fake-filter-list.service';
import { StoreTransformService } from 'src/app/services/internal/store-transform.service';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { ProductService } from 'src/app/services/product.service';
import { PaginationQueryService } from 'src/app/services/internal/pagination-query.service';
import { LdvService } from 'src/app/services/ldv.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data.resolved as IStoreCampaignPage;
  }

  campaignResults: ICampaignPage;
  currentPage: number = 1;
  sortValue: ISort;
  categoryList: ICategorySimple[] = [];
  fakeFilterList: Array<IFakeFilterList>;
  breadcrumb: Array<IBreadcrumbItem>;
  loadingProducts: boolean = false;
  activeFilter: boolean = false;
  filterUsed: any = null;
  filterObject: any = null;
  sortOption: string = null;
  sortOptions: Array<any>;

  constructor(
    private productService: ProductService,
    private campaignService: CampaignService,
    private storeTransformService: StoreTransformService,
    private categorySelectService: CategorySelectService,
    private fakeFilterListService: FakeFilterListService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private paginationQueryService: PaginationQueryService,
    private ldvService: LdvService
  ) {}

  ngOnInit(): void {
    this.ldvService.getLdvDetailLogged("SORT_OPTION").subscribe(
      (res) => {
        this.sortOptions = res;
        let searchOption = this.sortOptions.find(el => el._id === this.resolvedData.campaignData.entity.sort);
        if(searchOption) {
          this.changeSortType(searchOption.ref1);
        } else {
          this.changeSortType(this.sortOptions[0].ref1);
        }
      }
    )
    let fullUrl = this.router.url.split('/');

    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    this.filterUsed = JSON.parse(this.activeRoute.snapshot.queryParamMap.get('filter'))?.filters || null;

    if(this.resolvedData.filteredProducts){
      this.campaignResults = this.storeTransformService.transformCampaignWithFilteredProducts(
        this.resolvedData.campaignData,
        this.resolvedData.filteredProducts,
        this.filterUsed,
        urlWithoutParams
      );
    }else{
      this.campaignResults = this.storeTransformService.transformCampaign(
        this.resolvedData.campaignData,
        urlWithoutParams
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

    this.breadcrumb = [
      {
        name: this.resolvedData.categoryList.categoryGroupName,
        link: '/tienda/' + fullUrl[2],
      },
      {
        name: this.resolvedData.campaignData.entity.name,
        link: urlWithoutParams,
      },
    ];

    this.categoryList = [];
    this.categoryList.push(
      ...this.categorySelectService.formatCampaignListToSelect(
        this.resolvedData.campaignList,
        '/tienda/' + this.activeRoute.snapshot.params['group'] + '/camp/'
      )
    );
    this.categoryList.push(
      ...this.categorySelectService.formatCategoryListToSelect(
        this.resolvedData.categoryList,
        '/tienda/' + this.activeRoute.snapshot.params['group'] + '/categoria/'
      )
    );
    this.fakeFilterList = [];
  }

  initialize(): void {
    // HERE GOES FUNCTION
    debugger
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    this.loadingProducts = true;
    this.campaignService
      .getCampaignBySlug(
        this.resolvedData.campaignData.entity.friendly_url,
        this.currentPage,
        12,
        this.sortValue
      )
      .subscribe((result) => {
        this.loadingProducts = false;
        this.campaignResults.campaignProducts = this.storeTransformService.transformCampaignProducts(
          result.products.data,
          result.url_attachment,
          urlWithoutParams
        );
        this.paginationQueryService.setRouteParams(this.currentPage, null, this.sortValue);
      });
  }

  changePage(event): void {
    this.currentPage = event;
    if (this.activeFilter) {
      this.loadFilterProducts();
    } else {
      this.initialize();
    }
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
      this.filterObject = {
        filters: event,
        campaign_id: this.campaignResults?.campaignId,
        brand_id: null,
      };
      //if (this.sortValue) this.filterObject.sort = this.sortValue;
      this.currentPage = 1;
      this.loadFilterProducts();
    } else {
      this.campaignResults.campaignProducts = this.storeTransformService.transformCategoryProduct(
        this.resolvedData?.campaignData?.products?.data,
        this.campaignResults?.url_attachment
      );
      this.campaignResults.totalPages = this.resolvedData?.campaignData?.products?.quantityPage;
      this.currentPage = 1;
      this.campaignResults.totalProducts = this.resolvedData?.campaignData?.products?.totalItem;
      this.campaignResults.filters = this.storeTransformService.transformCategoryFilters(
        this.resolvedData?.campaignData?.filters
      );
      this.paginationQueryService.setRouteParams(this.currentPage, null, this.sortValue);
    }
  }

  loadFilterProducts(): void {
    this.productService
      .getCampaginProductByFilter(
        this.filterObject,
        this.currentPage,
        12,
        this.sortValue
      )
      .subscribe((result: any) => {
        this.campaignResults.campaignProducts = this.storeTransformService.transformCategoryProduct(
          result?.products?.data,
          this.campaignResults?.url_attachment
        );
        /*this.campaignResults.filters = this.storeTransformService.transformCategoryFiltersFiltered(
          result?.filters,
          this.filterUsed
        );*/
        this.campaignResults.totalPages = result?.products?.quantityPage;
        this.campaignResults.totalProducts = result?.products?.totalItem;
        this.loadingProducts = false;
        this.paginationQueryService.setRouteParams(this.currentPage, this.filterObject, this.sortValue);
      });
  }
}
