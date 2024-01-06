import { TestBed } from '@angular/core/testing';

import { AboutUsResolver } from './about-us.resolver';

describe('AboutUsResolver', () => {
  let resolver: AboutUsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AboutUsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
