import { TestBed } from '@angular/core/testing';

import { StoreTransformService } from './store-transform.service';

describe('StoreTransformService', () => {
  let service: StoreTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
