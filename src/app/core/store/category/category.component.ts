import { ActivatedRoute, Router } from '@angular/router';
import { CategorySelectService } from 'src/app/services/internal/category-select.service';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { FakeFilterListService } from 'src/app/services/internal/fake-filter-list.service';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import {
  ICategoryPage,
  ICategorySimple,
} from 'src/app/models/category-page.model';
import { IFakeFilterList } from 'src/app/models/filter.model';
import { ISort } from 'src/app/models/product.model';
import { IStoreCategory } from 'src/app/resolvers/core/store/category.resolver';
import { ProductService } from 'src/app/services/product.service';
import { StoreTransformService } from 'src/app/services/internal/store-transform.service';
import { PaginationQueryService } from 'src/app/services/internal/pagination-query.service';
import { LdvService } from 'src/app/services/ldv.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data.resolved as IStoreCategory;
  }
  activeFilter: boolean = false;
  breadcrumb: Array<IBreadcrumbItem>;
  categoryList: ICategorySimple[] = [];
  categoryResults: ICategoryPage = null;
  currentPage: number = null;
  fakeFilterList: Array<IFakeFilterList> = [];
  filterObject: any = null;
  filterUsed: any = null;
  loadingProducts: boolean = false;
  sortOption: string = '0';
  sortValue: ISort = null;
  sortOptions: Array<any>;

  constructor(
    private categoryService: CategoryService,
    private storeTransformService: StoreTransformService,
    private categorySelectService: CategorySelectService,
    private fakeFilterListService: FakeFilterListService,
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private paginationQueryService: PaginationQueryService,
    private ldvService: LdvService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.ldvService.getLdvDetailLogged("SORT_OPTION").subscribe(
      (res) => {
        this.sortOptions = res;
        let searchOption = this.sortOptions.find(el => el._id === this.resolvedData.categoryInfo.entity.sort);
        if(searchOption) {
          this.changeSortType(searchOption.ref1);
        } else {
          this.changeSortType(this.sortOptions[0].ref1);
        }
      }
    )
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    this.filterUsed = JSON.parse(this.activeRoute.snapshot.queryParamMap.get('filter'))?.filters || null;

    if(this.resolvedData.filteredProducts)
      this.categoryResults = this.storeTransformService.transformStoreCategoryWithFilteredProducts(
        this.resolvedData.categoryInfo,
        this.resolvedData.filteredProducts,
        this.filterUsed,
        urlWithoutParams + '/marca/'
      );
    else
      this.categoryResults = this.storeTransformService.transformStoreCategory(
        this.resolvedData.categoryInfo,
        urlWithoutParams + '/marca/'
      );

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
        name: this.resolvedData.categoryGroupData.categoryGroupName,
        link: '/tienda/' + fullUrl[2],
      },
      {
        name: this.resolvedData.categoryInfo.entity.name,
        link: urlWithoutParams,
      },
    ];

    this.categoryList = [];
    this.categoryList.push(
      ...this.categorySelectService.formatCampaignListToSelect(
        this.resolvedData.campaignsData,
        '/tienda/' + this.activeRoute.snapshot.params['group'] + '/camp/'
      )
    );
    this.categoryList.push(
      ...this.categorySelectService.formatCategoryListToSelect(
        this.resolvedData.categoryGroupData,
        '/tienda/' + this.activeRoute.snapshot.params['group'] + '/categoria/'
      )
    );

    this.fakeFilterList = [];
    this.fakeFilterList.push(
      ...this.fakeFilterListService.formatCategoryFakeFilterList(
        this.resolvedData.categoryInfo,
        urlWithoutParams,
        null,
        null
      )
    );
  }

  loadProducts(): void {
    this.loadingProducts = true;
    if (!this.activeFilter) {
      this.categoryService
        .getCategoryBySlug(
          this.activeRoute.snapshot.params['category'],
          this.currentPage,
          12,
          this.sortValue
        )
        .subscribe((result) => {
          this.categoryResults.categoryProducts = this.storeTransformService.transformCategoryProduct(
            result.products.data,
            result.url_attachment
          );
          this.loadingProducts = false;
          this.paginationQueryService.setRouteParams(this.currentPage, this.filterObject, this.sortValue);
        });
    } else {
      this.loadFilterProducts();
    }
  }

  changePage(event): void {
    this.currentPage = event;
    if (this.activeFilter) {
      this.loadFilterProducts();
    } else {
      this.loadProducts();
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
      this.loadProducts();
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
        category_id: this.categoryResults?.categoryId,
        brand_id: null,
      };

      //if (this.sortValue) this.filterObject.sort = this.sortValue;
      this.currentPage = 1;
      this.loadFilterProducts();
    } else {
      this.categoryResults.categoryProducts = this.storeTransformService.transformCategoryProduct(
        this.resolvedData?.categoryInfo?.products?.data,
        this.categoryResults?.url_attachment
      );
      this.categoryResults.totalPages = this.resolvedData?.categoryInfo?.products?.quantityPage;
      this.currentPage = 1;
      this.categoryResults.totalProducts = this.resolvedData?.categoryInfo?.products?.totalItem;
      this.categoryResults.filters = this.storeTransformService.transformCategoryFilters(
        this.resolvedData?.categoryInfo?.filters
      );
      this.paginationQueryService.setRouteParams(this.currentPage, null, this.sortValue);
    }
  }

  loadFilterProducts(): void {
    this.loadingProducts = true;
    this.productService
      .getProductByFilter(
        this.filterObject,
        this.currentPage,
        12,
        this.sortValue
      )
      .subscribe((result: any) => {
        this.setProductFiltered(result)
        this.loadingProducts = false;
        this.paginationQueryService.setRouteParams(this.currentPage, this.filterObject, this.sortValue);
      });
  }

  setProductFiltered(result: any): void{
    if(result){
      this.categoryResults.categoryProducts = [... this.storeTransformService.transformCategoryProduct(
        result?.products?.data,
        this.categoryResults?.url_attachment
      )];
      /*this.categoryResults.filters = this.storeTransformService.transformCategoryFiltersFiltered(
        result?.filters,
        this.filterUsed
      );*/
      this.categoryResults.totalPages = result?.products?.quantityPage;
      this.categoryResults.totalProducts = result?.products?.totalItem;
    }
  }
}
