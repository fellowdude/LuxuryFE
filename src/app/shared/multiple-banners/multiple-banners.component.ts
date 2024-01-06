import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-banners',
  templateUrl: './multiple-banners.component.html',
  styleUrls: ['./multiple-banners.component.scss'],
})
export class MultipleBannersComponent implements OnInit {
  @Input() categoryResults: any;

  constructor() {}

  ngOnInit(): void {
  }
}
