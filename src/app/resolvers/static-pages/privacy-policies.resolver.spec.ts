import { TestBed } from '@angular/core/testing';

import { PrivacyPoliciesResolver } from './privacy-policies.resolver';

describe('PrivacyPoliciesResolver', () => {
  let resolver: PrivacyPoliciesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PrivacyPoliciesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
