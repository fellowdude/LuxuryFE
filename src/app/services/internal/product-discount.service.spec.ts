import { TestBed } from '@angular/core/testing';

import { ProductDiscountService } from './product-discount.service';

describe('ProductDiscountService', () => {
  let service: ProductDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
