import { Component, Input, OnInit } from '@angular/core';
import { IHowToBuyCard } from 'src/app/models/static-items.model';

@Component({
  selector: 'app-htb-card',
  templateUrl: './htb-card.component.html',
  styleUrls: ['./htb-card.component.scss']
})
export class HtbCardComponent implements OnInit {

  @Input() card: IHowToBuyCard;

  constructor() { }

  ngOnInit(): void {
  }

}
