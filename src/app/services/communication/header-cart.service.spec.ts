import { TestBed } from '@angular/core/testing';

import { HeaderCartService } from './header-cart.service';

describe('HeaderCartService', () => {
  let service: HeaderCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
