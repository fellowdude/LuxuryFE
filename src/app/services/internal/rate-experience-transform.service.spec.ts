import { TestBed } from '@angular/core/testing';

import { RateExperienceTransformService } from './rate-experience-transform.service';

describe('RateExperienceTransformService', () => {
  let service: RateExperienceTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateExperienceTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
