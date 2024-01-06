import { TestBed } from '@angular/core/testing';

import { PaginationQueryService } from './pagination-query.service';

describe('PaginationQueryService', () => {
  let service: PaginationQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
