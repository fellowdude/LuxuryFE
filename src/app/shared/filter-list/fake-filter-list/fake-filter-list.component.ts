import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IFakeFilter, IFakeFilterList } from 'src/app/models/filter.model';

@Component({
  selector: 'app-fake-filter-list',
  templateUrl: './fake-filter-list.component.html',
  styleUrls: ['./fake-filter-list.component.scss'],
})
export class FakeFilterListComponent implements OnInit {
  @Input() fakeFilterList: Array<IFakeFilterList> = [];
  @Input() inMobile: boolean;
  @Output() onClick = new EventEmitter(true);

  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.fakeFilterList = fakeFilterList;
  }

  changeAction(event: IFakeFilter): void {
    if (this.inMobile) this.onClick.emit([event.route]);
    if (!this.inMobile) this.router.navigate([event.route]);
  }
}
