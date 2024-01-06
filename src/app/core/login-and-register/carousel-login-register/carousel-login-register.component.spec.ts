import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLoginRegisterComponent } from './carousel-login-register.component';

describe('CarouselLoginRegisterComponent', () => {
  let component: CarouselLoginRegisterComponent;
  let fixture: ComponentFixture<CarouselLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselLoginRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
