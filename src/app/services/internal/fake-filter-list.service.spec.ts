import { TestBed } from '@angular/core/testing';

import { FakeFilterListService } from './fake-filter-list.service';

describe('FakeFilterListService', () => {
  let service: FakeFilterListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeFilterListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
