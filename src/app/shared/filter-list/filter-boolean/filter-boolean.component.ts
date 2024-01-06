import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilterItem } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter-boolean',
  templateUrl: './filter-boolean.component.html',
  styleUrls: ['./filter-boolean.component.scss']
})
export class FilterBooleanComponent implements OnInit {
  active: boolean = false;
  @Input() filter: IFilterItem;
  @Input() contrastFilter: boolean;
  @Output() onClick = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
    this.active = this.contrastFilter || false;
  }

  changeActive(): void{
    this.active = !this.active;
    this.onClick.emit({ name: this.filter?.filter?.name,  value: this.active});
  }
}
