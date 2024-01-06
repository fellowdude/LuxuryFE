import { TestBed } from '@angular/core/testing';

import { TermsAndConditionsResolver } from './terms-and-conditions.resolver';

describe('TermsAndConditionsResolver', () => {
  let resolver: TermsAndConditionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TermsAndConditionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
