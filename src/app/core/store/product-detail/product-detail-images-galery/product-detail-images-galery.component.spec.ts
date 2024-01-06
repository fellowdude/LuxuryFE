import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailImagesGaleryComponent } from './product-detail-images-galery.component';

describe('ProductDetailImagesGaleryComponent', () => {
  let component: ProductDetailImagesGaleryComponent;
  let fixture: ComponentFixture<ProductDetailImagesGaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailImagesGaleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailImagesGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
