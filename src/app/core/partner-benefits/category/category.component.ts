import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategorySimple } from 'src/app/models/category-page.model';
import { ICategoryExperience } from 'src/app/models/experiences.model';
import { IPartnerBenefitsCategoryPage } from 'src/app/resolvers/core/partner-benefits/category.resolver';
import { CategorySelectService } from 'src/app/services/internal/category-select.service';
import { PartnerBenefitsTransformService } from 'src/app/services/internal/partner-benefits-transform.service';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { CategoryService } from 'src/app/services/category.service';
import { FakeFilterListService } from 'src/app/services/internal/fake-filter-list.service';
import { IFakeFilterList } from 'src/app/models/filter.model';
import { PaginationQueryService } from 'src/app/services/internal/pagination-query.service';
import { StoreTransformService } from 'src/app/services/internal/store-transform.service';
import { ExperiencesService } from 'src/app/services/experiences.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data[
      'resolved'
    ] as IPartnerBenefitsCategoryPage;
  }

  categoryExperience: ICategoryExperience;
  categoryList: Array<ICategorySimple>;
  breadcrumb: Array<IBreadcrumbItem>;
  currentPage: number = 0;
  loadingExperiences: boolean = false;
  brandFakeFilter: Array<IFakeFilterList> = [];
  filters: any;
  activeFilter: boolean = false;
  filterUsed: any;
  filterObject: any;

  constructor(
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute,
    private partnerBenefitsTransformService: PartnerBenefitsTransformService,
    private categorySelectService: CategorySelectService,
    private fakeFilterListService: FakeFilterListService,
    private router: Router,
    private paginationQueryService: PaginationQueryService,
    private storeTransformService: StoreTransformService,
    private experienceService: ExperiencesService
  ) {}

  ngOnInit(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams =
      '/' +
      urlTree.root.children['primary'].segments.map((it) => it.path).join('/');
    this.currentPage =
      Number(this.activeRoute.snapshot.queryParamMap.get('page')) || 1;

    let fullUrl = this.router.url.split('/');
    this.breadcrumb = [
      {
        name: this.resolvedData?.categoriesData?.categoryGroupName,
        link: '/beneficios/' + fullUrl[2],
      },
      {
        name: this.resolvedData.categoryInfo.entity.name,
        link: urlWithoutParams,
      },
    ];

    this.categoryExperience = this.partnerBenefitsTransformService.transformCategory(
      this.resolvedData.categoryInfo,
      '/beneficios/' + this.activeRoute.snapshot.params['group'] + '/categoria/'
    );

    this.categoryList = this.categorySelectService.formatCategoryListToSelect(
      this.resolvedData.categoriesData,
      '/beneficios/' + this.activeRoute.snapshot.params['group'] + '/categoria/'
    );

    this.brandFakeFilter = this.fakeFilterListService.formatBuisnessFakeFilterList(
      this.resolvedData.categoryInfo,
      urlWithoutParams
    );
    this.filters = this.storeTransformService.transformCategoryFilters(
      this.resolvedData.categoryInfo.entity.filters
    );
  }
  sendFilterData(event) {
    this.activeFilter = false;
    Object.keys(event).forEach((el) => {
      if (event[el]?.used) {
        this.activeFilter = true;
      }
    });
    if (this.activeFilter) {
      this.loadingExperiences = true;
      this.filterUsed = event;
      this.filterObject = {
        filters: event,
        category_id: this.resolvedData.categoryInfo.entity._id,
      };
      this.currentPage = 1;
      this.loadFilterAct();
    } else {
      this.categoryExperience = this.partnerBenefitsTransformService.transformCategory(
        this.resolvedData.categoryInfo,
        '/beneficios/' +
          this.activeRoute.snapshot.params['group'] +
          '/categoria/'
      );
      this.currentPage = 1;
      this.filters = this.storeTransformService.transformCategoryFilters(
        this.resolvedData.categoryInfo.entity.filters
      );
      this.paginationQueryService.setRouteParams(this.currentPage, null);
    }
  }

  loadFilterAct() {
    this.loadingExperiences = true;
    this.experienceService
      .getActByFilter(this.filterObject, this.currentPage, 8)
      .subscribe((result: any) => {
        this.setActivationsFiltered(result);
        this.loadingExperiences = false;
        this.paginationQueryService.setRouteParams(
          this.currentPage,
          this.filterObject
        );
      });
  }

  setActivationsFiltered(result: any): void {
    if (result) {
      this.categoryExperience.activations.activationsList = result.activations.data.map(
        (act) => ({
          _id: act?._id,
          backgroundUrl:
            this.resolvedData.categoryInfo.url_attachment +
            act?.image_thumbnail,
          link:
            '/beneficios/' +
            this.activeRoute.snapshot.params['group'] +
            '/categoria/' +
            this.resolvedData.categoryInfo.entity.friendly_url +
            '/empresa/' +
            act?.business_slug +
            '/beneficio/' +
            act?.slug,
          slug: act?.slug,
          subtitle: null,
          title: act?.title,
          buisness: act?.experience_name,
        })
      );
      /*this.filters = this.storeTransformService.transformCategoryFiltersFiltered(
        result?.filters,
        this.filterUsed
      );*/
      this.categoryExperience.activations.totalPages =
        result?.activations?.quantityPage;
      this.categoryExperience.activations.totalFound =
        result?.activations?.totalItem;
    }
  }

  loadExperiences(): void {
    this.loadingExperiences = true;
    this.categoryService
      .getCategoryBySlug(
        this.resolvedData.categoryInfo.entity.friendly_url,
        this.currentPage,
        8
      )
      .subscribe((response) => {
        this.categoryExperience = this.partnerBenefitsTransformService.transformCategory(
          response,
          '/beneficios/' +
            this.activeRoute.snapshot.params['group'] +
            '/categoria/'
        );
        this.paginationQueryService.setRouteParams(
          this.currentPage,
          null,
          null
        );
      });
  }

  changePage(event): void {
    this.currentPage = event;
    if (this.activeFilter) {
      this.loadFilterAct();
    } else {
      this.loadExperiences();
    }
  }
}
