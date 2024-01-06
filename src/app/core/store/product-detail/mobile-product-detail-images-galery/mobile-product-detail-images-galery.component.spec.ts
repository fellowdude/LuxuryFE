import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProductDetailImagesGaleryComponent } from './mobile-product-detail-images-galery.component';

describe('MobileProductDetailImagesGaleryComponent', () => {
  let component: MobileProductDetailImagesGaleryComponent;
  let fixture: ComponentFixture<MobileProductDetailImagesGaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileProductDetailImagesGaleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileProductDetailImagesGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
