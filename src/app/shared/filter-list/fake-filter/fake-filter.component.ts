import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFakeFilter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-fake-filter',
  templateUrl: './fake-filter.component.html',
  styleUrls: ['./fake-filter.component.scss'],
})
export class FakeFilterComponent implements OnInit {
  @Input() name: string;
  @Input() fakeFilters: Array<IFakeFilter>;
  @Input() inMobile: boolean;
  @Output() onClick = new EventEmitter(true);

  constructor() {}

  ngOnInit(): void {}

  changeActive(option: IFakeFilter): void {
    this.fakeFilters.forEach((elem) => {
      elem.active = false;
    });
    option.active = !option.active;
    this.onClick.emit(option);
  }
}
