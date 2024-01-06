import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-new-categories-list',
  templateUrl: './new-categories-list.component.html',
  styleUrls: ['./new-categories-list.component.scss'],
})
export class NewCategoriesListComponent implements OnInit, AfterViewInit {
  @Input() groupCategoriesList: any;
  @ViewChild('categoriesList') categoriesList: ElementRef<HTMLElement>;
  @ViewChild('categoriesWrapper') categoriesWrapper: ElementRef<HTMLElement>;
  @ViewChild('groupListContainer') groupListContainer: ElementRef<HTMLElement>;
  @Output() onClick = new EventEmitter(true);

  selectedGroup: any;
  selectedIndexGroup: number;
  selectedCategory: any;
  selectedIndexCategory: number;
  scrollArrowGroups: boolean = false;
  scrollArrowCategories: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkScrollable(this.groupListContainer, 'group');
    });
  }

  checkScrollable(
    element: ElementRef<HTMLElement>,
    condition: 'group' | 'categories'
  ) {
    const isScrollable =
      element.nativeElement.scrollHeight - element.nativeElement.clientHeight;
    if (condition === 'group') {
      this.scrollArrowGroups = isScrollable > 0 ? true : false;
    } else {
      this.scrollArrowCategories = isScrollable > 0 ? true : false;
    }
  }

  selectGroup(item: any, index: number): void {
    this.selectedGroup = item;
    this.selectedIndexGroup = index;
    this.selectedIndexCategory = null;
    this.selectedCategory = null;
    setTimeout(() => {
      this.checkScrollable(this.categoriesWrapper, 'categories');
      //   this.setColumnsSizes();
    });
  }

  setColumnsSizes() {
    const columnWidth = 233.4;
    const difference =
      this.categoriesList.nativeElement.lastElementChild.getBoundingClientRect()
        .left -
      this.categoriesList.nativeElement.firstElementChild.getBoundingClientRect()
        .left;
    if (difference < 200) {
      this.renderer.setStyle(
        this.categoriesWrapper.nativeElement,
        'width',
        `${columnWidth * 1}px`
      );
    } else if (difference > 230 && difference < 460) {
      this.renderer.setStyle(
        this.categoriesWrapper.nativeElement,
        'width',
        `${columnWidth * 2}px`
      );
    } else if (difference > 460 && difference < 700) {
      this.renderer.setStyle(
        this.categoriesWrapper.nativeElement,
        'width',
        `${columnWidth * 3}px`
      );
    } else if (difference > 700) {
      this.renderer.setStyle(
        this.categoriesWrapper.nativeElement,
        'width',
        `${columnWidth * 4}px`
      );
    }
  }

  path(item: any): string {
    return item?.typeGroupCategory?.ref1 == 'product'
      ? '/tienda/'
      : '/beneficios/';
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any, conditional: 'group' | 'categories') {
    if (
      event.target.scrollHeight - Math.ceil(event.target.scrollTop) <=
      event.target.clientHeight
    ) {
      if (conditional === 'group') {
        this.scrollArrowGroups = false;
      } else {
        this.scrollArrowCategories = false;
      }
    } else {
      if (conditional === 'group') {
        this.scrollArrowGroups = true;
      } else {
        this.scrollArrowCategories = true;
      }
    }
  }
}
