import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilterItem, IFilterSelectOptions } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter-radial',
  templateUrl: './filter-radial.component.html',
  styleUrls: ['./filter-radial.component.scss']
})
export class FilterRadialComponent implements OnInit {

  selectOptions: Array<IFilterSelectOptions> = [];
  @Input() filter: IFilterItem;
  @Output() onClick = new EventEmitter(true);
  @Input() contrastFilter: Array<boolean>;

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
    if(!option.toggle){
      this.selectOptions.forEach(
        (elem)=> {
          elem.toggle = false;
        }
      )
    }
    option.toggle = !option.toggle;
    this.onClick.emit({name: this.filter?.filter?.name, value: this.selectOptions.filter((e)=>{return e .toggle})});
  }
}
