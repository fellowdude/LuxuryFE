import { Component, OnInit, Input } from '@angular/core';
import { ICarouselImage } from '../../models/carousel-banner.model';

@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.scss'],
})
export class BannersListComponent implements OnInit {
  @Input() bannersData: Array<ICarouselImage>;

  constructor() {}

  ngOnInit(): void {}
}
