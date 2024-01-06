import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars-rating-product',
  templateUrl: './stars-rating-product.component.html',
  styleUrls: ['./stars-rating-product.component.scss'],
})
export class StarsRatingProductComponent implements OnInit {
  @Input() rating: number;
  @Input() disabled: boolean = false;
  @Output() ratingEmitted = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  selectRating() {
    this.ratingEmitted.emit(this.rating);
  }
}
