import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { FilterMobileComponent } from 'src/app/modals/products/filter-mobile/filter-mobile.component';
import { ICategorySimple } from 'src/app/models/category-page.model';
import { IFakeFilterList, IFilterItem } from 'src/app/models/filter.model';

@Component({
  selector: 'app-product-list-mobile-menu',
  templateUrl: './product-list-mobile-menu.component.html',
  styleUrls: ['./product-list-mobile-menu.component.scss'],
})
export class ProductListMobileMenuComponent implements OnInit {
  optionSelected: string = '0';
  @Input() listCategories: ICategorySimple[] = [];
  @Input() fakeFilterList: IFakeFilterList[] = [];
  @Input() filterList: IFilterItem[] = [];
  @Input() experience: boolean = false;
  @Output() onResponse = new EventEmitter(true);
  @Output() sortResponse = new EventEmitter(true);
  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService) {}

  ngOnInit(): void {
  }

  openFilter(): void {
    this.modalRef = this.modalService.show(FilterMobileComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        fakeFilterList: this.fakeFilterList,
        filterList: this.filterList,
      },
    });

    this.modalRef.content.action.subscribe((result: any) => {
      this.onResponse.emit(result);
    });
  }

  modifySort(): void {
    this.sortResponse.emit(this.optionSelected);
  }
}
