import { TestBed } from '@angular/core/testing';

import { FaqResolver } from './faq.resolver';

describe('FaqResolver', () => {
  let resolver: FaqResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FaqResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
