import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilterItem, IFilterSelectOptions } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
  styleUrls: ['./filter-checkbox.component.scss']
})
export class FilterCheckboxComponent implements OnInit {

  selectOptions: Array<IFilterSelectOptions> = [];
  @Input() filter: IFilterItem;
  @Input() contrastFilter: Array<boolean>;
  @Output() onClick = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
    this.filter?.value?.forEach(
      (elem, index)=> {
        this.selectOptions.push({
          name: elem,
          toggle: this.contrastFilter?.[index] || false
        })
      }
    )
  }

  changeActive(option: IFilterSelectOptions): void {
    option.toggle = !option.toggle;
    this.onClick.emit({name: this.filter?.filter?.name, value: this.selectOptions.filter((e)=>{return e .toggle})});
  }

}
