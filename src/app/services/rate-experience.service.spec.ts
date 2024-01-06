import { TestBed } from '@angular/core/testing';

import { RateExperienceService } from './rate-experience.service';

describe('RateExperienceService', () => {
  let service: RateExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
