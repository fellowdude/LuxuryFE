import { TestBed } from '@angular/core/testing';

import { BrandDetailPageService } from './brand-detail-page.service';

describe('BrandDetailPageService', () => {
  let service: BrandDetailPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandDetailPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
