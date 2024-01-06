import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-brand-banner',
  templateUrl: './brand-banner.component.html',
  styleUrls: ['./brand-banner.component.scss'],
})
export class BrandBannerComponent implements OnInit {
  @Input() name: string;
  @Input() background: string;
  @Input() logo: string = null;
  @Input() showInfo: boolean = true;
  @Input() showMedia: boolean = true;
  @Input() isGradient: boolean = false;
  @Output() onInfoClick = new EventEmitter(true);
  @Output() onMediaClick = new EventEmitter(true);

  constructor() {}

  ngOnInit(): void {}
}
