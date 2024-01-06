import { TestBed } from '@angular/core/testing';

import { FormatCheckoutAdService } from './format-checkout-ad.service';

describe('FormatCheckoutAdService', () => {
  let service: FormatCheckoutAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatCheckoutAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
