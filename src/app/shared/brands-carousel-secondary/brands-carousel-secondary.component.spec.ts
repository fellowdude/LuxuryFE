import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsCarouselSecondaryComponent } from './brands-carousel-secondary.component';

describe('BrandsCarouselSecondaryComponent', () => {
  let component: BrandsCarouselSecondaryComponent;
  let fixture: ComponentFixture<BrandsCarouselSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsCarouselSecondaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsCarouselSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
