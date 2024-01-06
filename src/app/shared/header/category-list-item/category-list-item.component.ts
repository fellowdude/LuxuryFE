import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
})
export class CategoryListItemComponent implements OnInit {
  @Input() category: any;
  @Input() selectedGroup: any;
  @Input() type: 'category' | 'campaign';
  @Input() cbPath: (item: any) => string;
  //@Input() onClick: () => void;

  constructor() {}

  ngOnInit(): void {
  }
}
