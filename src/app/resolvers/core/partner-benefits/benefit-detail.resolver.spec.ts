import { TestBed } from '@angular/core/testing';

import { BenefitDetailResolver } from './benefit-detail.resolver';

describe('BenefitDetailResolver', () => {
  let resolver: BenefitDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BenefitDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
