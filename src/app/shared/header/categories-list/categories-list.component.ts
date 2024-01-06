import { Component, OnInit, Input, HostListener } from '@angular/core';
// import { groupCategoriesInfo } from '../../../mockups/header.mockup';
//import { UiService } from '../../../services/communication/ui.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  isBlur: boolean = false;
  @Input() groupCategoriesList: any;
  selectedGroup: any;
  selectedIndexGroup: number;
  selectedCategory: any;
  selectedIndexCategory: number;
  scrollArrow: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  selectGroup(item: any, index: number): void {
    this.selectedGroup = item;
    this.selectedIndexGroup = index;
    this.selectedIndexCategory = null;
    this.selectedCategory = null;
    if (
      this.selectedGroup?.categories?.length +
        this.selectedGroup?.campaigns?.length >
      13
    ) {
      this.scrollArrow = true;
    } else {
      this.scrollArrow = false;
    }
  }

  selectCategory(item: any, index: number): void {
    this.selectedCategory = item;
    this.selectedIndexCategory = index;
  }

  unSelectCategory(): any {
    this.selectedCategory = null;
    this.selectedIndexCategory = null;
  }

  path(item: any): string {
    return item?.typeGroupCategory?.ref1 == 'product'
      ? '/tienda/'
      : '/beneficios/';
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (
      event.target.offsetHeight + event.target.scrollTop ===
      event.target.scrollHeight
    ) {
      this.scrollArrow = false;
    } else {
      this.scrollArrow = true;
    }
  }
}
