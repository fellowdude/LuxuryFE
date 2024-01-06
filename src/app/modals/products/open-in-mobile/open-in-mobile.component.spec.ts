import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInMobileComponent } from './open-in-mobile.component';

describe('OpenInMobileComponent', () => {
  let component: OpenInMobileComponent;
  let fixture: ComponentFixture<OpenInMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenInMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
