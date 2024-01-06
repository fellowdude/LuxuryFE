import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCarouselBannerComponent } from './ad-carousel-banner.component';

describe('AdCarouselBannerComponent', () => {
  let component: AdCarouselBannerComponent;
  let fixture: ComponentFixture<AdCarouselBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdCarouselBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCarouselBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
