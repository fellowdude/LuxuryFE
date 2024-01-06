import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { IFakeFilter, IFilterItem } from 'src/app/models/filter.model';
import { FilterListComponent } from 'src/app/shared/filter-list/filter-list.component';

@Component({
  selector: 'app-filter-mobile',
  templateUrl: './filter-mobile.component.html',
  styleUrls: ['./filter-mobile.component.scss']
})
export class FilterMobileComponent implements OnInit {
  fakeFilterList: Array<IFakeFilter>;
  filterList: Array<IFilterItem>;
  filters: any = null;
  action: Subject<any> = new Subject();
  @ViewChild('filterChild') filterChild: FilterListComponent;

  constructor(private router: Router, public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  sendToRoute(event): void {
    this.closeModal();
    this.router.navigate(event);
  }

  filtersApplied(event): void {
    this.filters = event;
  }

  applyFilters(): void {
    this.closeModal();
    this.action.next(this.filterChild.getRangeFilter());
  }

  closeModal(): void {
    this.modalRef.hide();
  }

}
