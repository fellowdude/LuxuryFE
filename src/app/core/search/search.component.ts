import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ISearchFilters } from 'src/app/models/filter.model';
import { ISort } from 'src/app/models/product.model';
import { ISearchResult } from 'src/app/models/search-result.model';
import { ISearchResultsReceived } from 'src/app/resolvers/core/search/search.resolver';
import { SearchTransformService } from 'src/app/services/internal/search-transform.service';
import { SearchService } from 'src/app/services/search.service';
import { LdvService } from 'src/app/services/ldv.service';

const customRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('min').value;
  const end = fg.get('max').value;
  return start !== null && end !== null && start < end
    ? null
    : { 'app-filter-range': true };
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResult: ISearchResult;
  currentPage: number = 1;
  sortValue: ISort;
  searchValue: string;
  rangeForm: FormGroup;
  filters: ISearchFilters = null;
  sended: boolean = false;
  loadingProducts: boolean = false;
  sortOptions: Array<any>;

  get resolvedData() {
    return this.activeRoute.snapshot.data.resolved as ISearchResultsReceived;
  }
  constructor(
    private activeRoute: ActivatedRoute,
    private searchTransformService: SearchTransformService,
    private searchService: SearchService,
    private fb: FormBuilder,
    private _ldvService: LdvService,
  ) { }
  ngOnInit(): void {
    this._ldvService.getLdvDetailLogged('SORT_OPTION').subscribe(
      (res) => {
        this.sortOptions = res;
      }
    )

    // this.searchResult = searchResult;
    this.activeRoute.params.subscribe(
      ({ searchValue }) => (this.searchValue = searchValue)
    );

    this.searchResult = this.searchTransformService.transforSearchResults(
      this.resolvedData
    );
    this.filters = {
      ...this.searchTransformService.formatProductFilterSearchData(
        this.searchResult.productsFound, this.searchResult.brands
      ),
    };

    this.rangeForm = this.fb.group(
      {
        min: new FormControl(null, [Validators.required]),
        max: new FormControl(null, [Validators.required]),
      },
      { validators: customRangeValidator }
    );

  }

  initialize(): void {
    this.loadingProducts = true;
    let minPrice = this.rangeForm.get('min').value;
    let maxPrice = this.rangeForm.get('max').value;
    let priceFilter = [];
    if (minPrice != null && maxPrice != null) {
      priceFilter = [minPrice, maxPrice];
    }
    this.setProductsResults(priceFilter, this.currentPage, this.sortValue);
  }

  changePage(event: number): void {
    this.currentPage = event;
    this.initialize();
  }
  setProductsResults(priceFilter = [], currentPage = 1, sortValue = {}) {
    let brandsActive = this.getBrandsActive();
    this.searchService
      .getProductsResults(this.searchValue, currentPage, 12, sortValue, brandsActive, priceFilter)
      .pipe(tap(console.log))
      .subscribe((response) => {
        this.searchResult.productsFound = this.searchTransformService.transformProductsSearchResults(
          response
        ).productsFound;
        this.searchResult.totalPages = Math.ceil(response.total / 12);
        this.searchResult.totalProductsFound = response.total;
        this.loadingProducts = false;
      });
  }
  getBrandsActive(): Array<string> {
    let brandsActive: Array<string> = [];
    this.filters.brands.forEach((el) => {
      if (el?.active) {
        brandsActive.push(el.value);
      }
    });
    return brandsActive;
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
    this.currentPage = 1;
    this.initialize();

  }
  changePrice() {
    this.loadingProducts = true;
    let minValue = this.rangeForm.get('min').value;
    let maxPrice = this.rangeForm.get('max').value;
    this.setProductsResults([minValue, maxPrice]);
    this.currentPage = 1;
  }

  changeActive(option?): void {
    this.loadingProducts = true;
    this.rangeForm.get('min').setValue(null);
    this.rangeForm.get('max').setValue(null);
    //cambia el estado activo de la marca
    if (option) option.active = !option.active;
    this.setProductsResults([], 1, {});
    this.currentPage = 1;
  }

}
