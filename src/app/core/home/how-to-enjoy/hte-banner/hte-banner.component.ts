import { Component, OnInit, Input } from '@angular/core';
import { IHowToEnjoy } from 'src/app/models/static-items.model';

@Component({
  selector: 'app-hte-banner',
  templateUrl: './hte-banner.component.html',
  styleUrls: ['./hte-banner.component.scss']
})
export class HteBannerComponent implements OnInit {

  @Input() data: IHowToEnjoy;
  @Input() position: string;
  @Input() color: string;
  @Input() txtColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
