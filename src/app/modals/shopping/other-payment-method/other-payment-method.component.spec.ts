import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPaymentMethodComponent } from './other-payment-method.component';

describe('OtherPaymentMethodComponent', () => {
  let component: OtherPaymentMethodComponent;
  let fixture: ComponentFixture<OtherPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
