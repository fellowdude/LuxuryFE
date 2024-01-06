import { Component, Input, OnInit } from '@angular/core';
import { IBrandCarouselItem } from 'src/app/models/brands-carousel.model';

@Component({
  selector: 'app-associated-brands',
  templateUrl: './associated-brands.component.html',
  styleUrls: ['./associated-brands.component.scss']
})
export class AssociatedBrandsComponent implements OnInit {

  @Input() items: Array<IBrandCarouselItem>;
  @Input() greyscale: boolean = false;
  @Input() highlight: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
