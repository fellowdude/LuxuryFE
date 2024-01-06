import { Component, Input, OnInit } from '@angular/core';
import { ICardListItem } from 'src/app/models/card-list.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() config?: ICardListItem;
  @Input() type: string = 'category';

  constructor() {}

  ngOnInit(): void {}
}
