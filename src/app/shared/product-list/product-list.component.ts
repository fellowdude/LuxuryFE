import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GtagService } from 'src/app/gtag/gtag.service';
import { IFilter } from 'src/app/models/filter.model';
import { IProductCard } from 'src/app/models/product-card.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() currentPage: number = 0;
  @Input() productsFound: IProductCard[];
  @Input() origin: string = null;
  @Input() totalFound: number = 0;
  @Input() pages: number = 0;
  @Input() filter: IFilter;
  @Input() sortOption: string = '0';
  @Input() maxColumns: number = 4;
  @Input() loading: boolean = false;
  @Input() sortOptions: Array<any>;
  @Input() categoryId: string;
  @Output() onPageClick = new EventEmitter(true);
  @Output() onSortClick = new EventEmitter(true);

  constructor(private gtag: GtagService) {}

  ngOnInit(): void {
    if(!this.currentPage) this.currentPage = 1;
  }

  changePage(event: number): void {
    this.currentPage = event;
    this.onPageClick.emit(event);
  }

  changeSort(event): void {
    this.sortOption = event;
    this.onSortClick.emit(event);
  }


  get opened(): number {
    return this.currentPage;
  }
  @Input('currentPage') set opened(value: number) {
    this.currentPage = value;
  }

  get productChange(): IProductCard[] {
    return this.productsFound;
  }
  @Input('productsFound') set productChange(value: IProductCard[]) {
    this.productsFound = value;
    this.gtag.viewItemList(
      this.productsFound.map( (product, index) =>{
        return {
          id: product?.sku,
          name: product?.productName,
          brand: product?.brand,
          category: product?.campaignName || product?.categories?.[0]?.name,
          price: product?.specialPrice,
          list_position: (index + 1) + ((this.currentPage - 1) * 12),
          list_name: this.origin
        }
      })
    )
  }
}
