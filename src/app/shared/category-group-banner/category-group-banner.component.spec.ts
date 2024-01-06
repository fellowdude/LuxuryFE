import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGroupBannerComponent } from './category-group-banner.component';

describe('CategoryGroupBannerComponent', () => {
  let component: CategoryGroupBannerComponent;
  let fixture: ComponentFixture<CategoryGroupBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryGroupBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGroupBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
