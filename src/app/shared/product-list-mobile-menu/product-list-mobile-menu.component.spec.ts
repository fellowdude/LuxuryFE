import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListMobileMenuComponent } from './product-list-mobile-menu.component';

describe('ProductListMobileMenuComponent', () => {
  let component: ProductListMobileMenuComponent;
  let fixture: ComponentFixture<ProductListMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListMobileMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
