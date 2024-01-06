import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsRatingProductComponent } from './stars-rating-product.component';

describe('StarsRatingProductComponent', () => {
  let component: StarsRatingProductComponent;
  let fixture: ComponentFixture<StarsRatingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsRatingProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsRatingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
