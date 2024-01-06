import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  today: Date = new Date();
  orderCode: string = '';

  constructor() {}

  ngOnInit(): void {
    this.orderCode = sessionStorage.getItem('code');
    sessionStorage.removeItem('code');
  }
}
