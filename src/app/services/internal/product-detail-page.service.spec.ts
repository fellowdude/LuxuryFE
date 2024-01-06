import { TestBed } from '@angular/core/testing';

import { ProductDetailPageService } from './product-detail-page.service';

describe('ProductDetailPageService', () => {
  let service: ProductDetailPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
