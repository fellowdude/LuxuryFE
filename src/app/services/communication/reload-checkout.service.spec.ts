import { TestBed } from '@angular/core/testing';

import { ReloadCheckoutService } from './reload-checkout.service';

describe('ReloadCheckoutService', () => {
  let service: ReloadCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
