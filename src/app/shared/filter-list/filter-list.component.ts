import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IFilterItem } from 'src/app/models/filter.model';
import { FilterRangeComponent } from './filter-range/filter-range.component';
@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent implements OnInit {
  @Input() filters: Array<IFilterItem>;
  @Input() mobile: boolean;
  filterResult: any = {};
  @Output() onClick = new EventEmitter(true);
  @ViewChild('range') rangeFilter: FilterRangeComponent;

  constructor() {}

  ngOnInit(): void {
    this.filters?.forEach((el) => {
      this.filterResult[el?.filter?.name] = {
        filter_id: el?._id,
        type: el?.filter?.type,
        used: false,
        bindedTo: el?.filter?.bindedTo || '',
        unit: el?.filter?.unit || null,
        value: [],
      };
    });
  }

  public getRangeFilter() {
    this.filterResult[this.rangeFilter.filter?.filter?.name].unit = this.rangeFilter.filter?.filter?.unit;
    this.filterResult[this.rangeFilter.filter?.filter?.name].used =
      !this.rangeFilter.rangeForm.value.min && !this.rangeFilter.rangeForm.value.max ? false : true;
    this.filterResult[this.rangeFilter.filter?.filter?.name].value = [this.rangeFilter.rangeForm.value.min, this.rangeFilter.rangeForm.value.max];
    return this.getActiveFilters(this.filterResult);
  }

  getActiveFilters(filterObject: any) {
    let activeFilters = {};

    Object.keys(this.filterResult).forEach((key) => {
      if (this.filterResult[key]?.used) {
        activeFilters = { ...activeFilters, [key]: this.filterResult[key] };
      }
    });

    return activeFilters;
  }

  filterCheckboxChange(event): void {
    this.filterResult[event.name].used = event.value?.some(
      (e) => e.toggle === true
    )
      ? true
      : false;

    this.filterResult[event.name].value = event.value;
    this.onClick.emit(this.getActiveFilters(this.filterResult));
  }

  filterRadialChange(event): void {
    this.filterResult[event.name].used = event.value?.some(
      (e) => e.toggle === true
    )
      ? true
      : false;
    this.filterResult[event.name].value = event.value;
    this.onClick.emit(this.getActiveFilters(this.filterResult));
  }

  filterRangeChange(event): void {
    this.filterResult[event.name].unit = event.unit;
    this.filterResult[event.name].used =
      !event.value.min && !event.value.max ? false : true;
    this.filterResult[event.name].value = [event.value.min, event.value.max];
    this.onClick.emit(this.getActiveFilters(this.filterResult));
  }

  filterBooleanChange(event): void {
    this.filterResult[event.name].used = event.value;
    this.filterResult[event.name].value = [event.value];
    this.onClick.emit(this.getActiveFilters(this.filterResult));
  }
}
