import { Component, Input, OnInit } from '@angular/core';
import { ICarouselImage } from 'src/app/models/carousel-banner.model';

@Component({
  selector: 'app-banner-internal-group',
  templateUrl: './banner-internal-group.component.html',
  styleUrls: ['./banner-internal-group.component.scss']
})
export class BannerInternalGroupComponent implements OnInit {

  @Input() data: Array<ICarouselImage>;

  constructor() { }

  ngOnInit(): void {
  }

}
