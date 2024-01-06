import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLateralBarComponent } from './mobile-lateral-bar.component';

describe('MobileLateralBarComponent', () => {
  let component: MobileLateralBarComponent;
  let fixture: ComponentFixture<MobileLateralBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileLateralBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLateralBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
