import { TestBed } from '@angular/core/testing';

import { BrandResolver } from './brand.resolver';

describe('BrandResolver', () => {
  let resolver: BrandResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BrandResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
