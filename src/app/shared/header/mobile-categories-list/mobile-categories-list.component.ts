import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuName } from '../header.component';
import { Router } from '@angular/router';
// import { groupCategoriesInfo } from 'src/app/mockups/header.mockup';

@Component({
  selector: 'app-mobile-categories-list',
  templateUrl: './mobile-categories-list.component.html',
  styleUrls: ['./mobile-categories-list.component.scss'],
})
export class MobileCategoriesListComponent implements OnInit {
  // @Input() groupCategoriesList = groupCategoriesInfo;
  @Input() groupCategoriesList;
  @Output() onClose = new EventEmitter<MenuName.MOBILE_CATEGORY_LIST>();
  selectedGroup: any;
  selectedCategory: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  isGroupExperience(group: any): boolean {
    return group.typeGroupCategory.ref1 === 'experience';
  }

  isGroupSelected(group: any): boolean {
    return this.selectedGroup === group;
  }

  selectGroup(item: any): void {
    this.selectedGroup = item;
    this.selectedCategory = null;
  }

  unSelectGroup() {
    this.selectedGroup = null;
    this.selectedCategory = null;
  }

  isCategorySelected(category: any): boolean {
    return this.selectedCategory === category;
  }

  selectCategory(item: any): void {
    this.selectedCategory = item;
  }

  unSelectCategory() {
    this.selectedCategory = null;
  }

  quantitySubcategories(category: any): string {
    return category.subcategories.length > 1
      ? `(${category.subcategories.length})`
      : '';
  }

  path(item: any): string {
    return item?.typeGroupCategory?.ref1 == 'product'
      ? '/tienda/'
      : '/beneficios/';
  }

  navigate(route: string) {
    this.onClose.emit(MenuName.MOBILE_CATEGORY_LIST);
    this.router.navigate([route]);
  }
}
