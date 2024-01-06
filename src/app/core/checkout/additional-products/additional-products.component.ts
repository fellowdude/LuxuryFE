import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GtagService } from 'src/app/gtag/gtag.service';
import { IAdditionalProductItem } from 'src/app/models/checkout.model';

@Component({
  selector: 'app-additional-products',
  templateUrl: './additional-products.component.html',
  styleUrls: ['./additional-products.component.scss']
})
export class AdditionalProductsComponent implements OnInit {

  once: boolean = false;
  @ViewChild('testDiv') private testDiv: ElementRef<HTMLDivElement>;
  @Input() additionalProductList: Array<IAdditionalProductItem> = [];
  @Output() onClick = new EventEmitter<any>(true);

  constructor(private gtag: GtagService) { }

  ngOnInit(): void {

  }

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    if (this.testDiv && !this.once){
      const rect = this.testDiv.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      if(topShown && bottomShown){
        this.once = true;
        this.gtag.viewItemList(
          this.additionalProductList.map( (product, index) =>{
            return {
              id: product?.productInfo?.sku,
              name: product?.productInfo?.productName,
              brand: product?.productInfo?.brand,
              category: product?.productInfo?.campaignName || product?.productInfo?.categories?.[0]?.name,
              price: product?.specialSalePrice,
              list_position: index,
              list_name: 'Additional Products'
            }
          })
        )
      }
    }
  }
}
