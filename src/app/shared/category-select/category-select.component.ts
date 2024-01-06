import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategorySimple } from 'src/app/models/category-page.model';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
})
export class CategorySelectComponent implements OnInit {
  @Input() listCategories: Array<ICategorySimple>;
  selectedCategoryLink: string = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  changeSelection(): void {
    this.router.navigate([this.selectedCategoryLink]);
  }
}
