import { TestBed } from '@angular/core/testing';

import { RateProductService } from './rate-product.service';

describe('RateProductService', () => {
  let service: RateProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
