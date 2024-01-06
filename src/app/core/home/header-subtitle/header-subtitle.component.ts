import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-subtitle',
  templateUrl: './header-subtitle.component.html',
  styleUrls: ['./header-subtitle.component.scss']
})
export class HeaderSubtitleComponent implements OnInit {

  @Input() subtitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
