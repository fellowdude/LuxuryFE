import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCardItemComponent } from './checkout-card-item.component';

describe('CheckoutCardItemComponent', () => {
  let component: CheckoutCardItemComponent;
  let fixture: ComponentFixture<CheckoutCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
