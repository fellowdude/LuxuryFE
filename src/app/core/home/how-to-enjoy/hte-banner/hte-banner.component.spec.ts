import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HteBannerComponent } from './hte-banner.component';

describe('HteBannerComponent', () => {
  let component: HteBannerComponent;
  let fixture: ComponentFixture<HteBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HteBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HteBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
