import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCategoryRedirectComponent } from './catalog-category-redirect.component';

describe('CatalogCategoryRedirectComponent', () => {
  let component: CatalogCategoryRedirectComponent;
  let fixture: ComponentFixture<CatalogCategoryRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogCategoryRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCategoryRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
