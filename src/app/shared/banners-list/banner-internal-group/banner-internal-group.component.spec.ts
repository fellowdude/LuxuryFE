import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInternalGroupComponent } from './banner-internal-group.component';

describe('BannerInternalGroupComponent', () => {
  let component: BannerInternalGroupComponent;
  let fixture: ComponentFixture<BannerInternalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerInternalGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerInternalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
