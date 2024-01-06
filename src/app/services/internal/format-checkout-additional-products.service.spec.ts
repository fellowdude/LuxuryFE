import { TestBed } from '@angular/core/testing';

import { FormatCheckoutAdditionalProductsService } from './format-checkout-additional-products.service';

describe('FormatCheckoutAdditionalProductsService', () => {
  let service: FormatCheckoutAdditionalProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatCheckoutAdditionalProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
