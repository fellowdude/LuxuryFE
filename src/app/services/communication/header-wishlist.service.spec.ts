import { TestBed } from '@angular/core/testing';

import { HeaderWishlistService } from './header-wishlist.service';

describe('HeaderWishlistService', () => {
  let service: HeaderWishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderWishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
