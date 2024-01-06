import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';

@Component({
  selector: 'app-subtitle-breadcrumb',
  templateUrl: './subtitle-breadcrumb.component.html',
  styleUrls: ['./subtitle-breadcrumb.component.scss']
})
export class SubtitleBreadcrumbComponent implements OnInit {

  @Input() highlight: boolean = false;
  @Input() breadcrumb: Array<IBreadcrumbItem> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
