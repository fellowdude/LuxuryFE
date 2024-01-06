import { TestBed } from '@angular/core/testing';

import { NewMemberTransformService } from './new-member-transform.service';

describe('NewMemberTransformService', () => {
  let service: NewMemberTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMemberTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
