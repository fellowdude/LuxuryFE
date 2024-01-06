import { TestBed } from '@angular/core/testing';

import { ProdcutDetailService } from './prodcut-detail.service';

describe('ProdcutDetailService', () => {
  let service: ProdcutDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdcutDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
