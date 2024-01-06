import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBannerItemComponent } from './carousel-banner-item.component';

describe('CarouselBannerItemComponent', () => {
  let component: CarouselBannerItemComponent;
  let fixture: ComponentFixture<CarouselBannerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselBannerItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselBannerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
