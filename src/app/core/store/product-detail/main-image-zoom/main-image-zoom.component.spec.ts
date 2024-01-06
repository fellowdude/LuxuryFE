import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainImageZoomComponent } from './main-image-zoom.component';

describe('MainImageZoomComponent', () => {
  let component: MainImageZoomComponent;
  let fixture: ComponentFixture<MainImageZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainImageZoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainImageZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
