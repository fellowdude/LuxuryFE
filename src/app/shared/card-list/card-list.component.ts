import { Component, Input, OnInit } from '@angular/core';
import { ICardListItem } from 'src/app/models/card-list.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() type: string;
  @Input() cardList: Array<ICardListItem>;

  constructor() {}

  ngOnInit(): void {}

  public get classes(): string {
    return //'col-md-3 col-lg-2';
  }

}
