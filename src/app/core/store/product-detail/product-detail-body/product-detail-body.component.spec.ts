import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailBodyComponent } from './product-detail-body.component';

describe('ProductDetailBodyComponent', () => {
  let component: ProductDetailBodyComponent;
  let fixture: ComponentFixture<ProductDetailBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
