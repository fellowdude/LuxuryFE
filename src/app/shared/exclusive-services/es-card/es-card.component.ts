import { Component, Input, OnInit } from '@angular/core';
import { IExclusiveServicesCard } from 'src/app/models/static-items.model';

@Component({
  selector: 'app-es-card',
  templateUrl: './es-card.component.html',
  styleUrls: ['./es-card.component.scss']
})
export class EsCardComponent implements OnInit {

  @Input() card: IExclusiveServicesCard;

  constructor() { }

  ngOnInit(): void {
  }

}
