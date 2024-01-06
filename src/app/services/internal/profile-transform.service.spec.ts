import { TestBed } from '@angular/core/testing';

import { ProfileTransformService } from './profile-transform.service';

describe('ProfileTransformService', () => {
  let service: ProfileTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
