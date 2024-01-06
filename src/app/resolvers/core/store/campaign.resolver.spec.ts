import { TestBed } from '@angular/core/testing';

import { CampaignResolver } from './campaign.resolver';

describe('CampaignResolver', () => {
  let resolver: CampaignResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CampaignResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
