import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownBannerComponent } from './countdown-banner.component';

describe('CountdownBannerComponent', () => {
  let component: CountdownBannerComponent;
  let fixture: ComponentFixture<CountdownBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdownBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
