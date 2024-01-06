import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-loading',
  templateUrl: './global-loading.component.html',
  styleUrls: ['./global-loading.component.scss'],
})
export class GlobalLoadingComponent implements OnInit {
  @Input() color = 'blue-4f';

  constructor() {}

  ngOnInit(): void {}
}
