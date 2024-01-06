import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSupplierProductComponent } from './checkout-supplier-product.component';

describe('CheckoutSupplierProductComponent', () => {
  let component: CheckoutSupplierProductComponent;
  let fixture: ComponentFixture<CheckoutSupplierProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSupplierProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSupplierProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
