import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumb: Array<IBreadcrumbItem> = [];

  constructor() {}

  ngOnInit(): void {}
}
