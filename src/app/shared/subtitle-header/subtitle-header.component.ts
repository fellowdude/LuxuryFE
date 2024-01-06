import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subtitle-header',
  templateUrl: './subtitle-header.component.html',
  styleUrls: ['./subtitle-header.component.scss'],
})
export class SubtitleHeaderComponent implements OnInit {
  @Input() subtitle: string;
  @Input() highlight: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
