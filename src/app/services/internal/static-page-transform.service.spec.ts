import { TestBed } from '@angular/core/testing';

import { StaticPageTransformService } from './static-page-transform.service';

describe('StaticPageTransformService', () => {
  let service: StaticPageTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticPageTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
