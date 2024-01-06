import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-link',
  templateUrl: './custom-link.component.html',
  styleUrls: ['./custom-link.component.scss'],
})
export class CustomLinkComponent implements OnInit {
  @Input() link: string;
  constructor() {}

  ngOnInit(): void {}

  isExternal() {
    return this.link.startsWith('http');
  }
}
