import { TestBed } from '@angular/core/testing';

import { WishlistTransformService } from './wishlist-transform.service';

describe('WishlistTransformService', () => {
  let service: WishlistTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
