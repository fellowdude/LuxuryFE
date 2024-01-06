import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss'],
})
export class StarsRatingComponent implements OnInit {
  @Input() rating: number;
  @Output() ratingEmitted = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  selectRating() {
    this.ratingEmitted.emit(this.rating);
  }
}
