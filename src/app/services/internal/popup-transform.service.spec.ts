import { TestBed } from '@angular/core/testing';

import { PopupTransformService } from './popup-transform.service';

describe('PopupTransformService', () => {
  let service: PopupTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
