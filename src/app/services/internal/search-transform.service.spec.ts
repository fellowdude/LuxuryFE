import { TestBed } from '@angular/core/testing';

import { SearchTransformService } from './search-transform.service';

describe('SearchTransformService', () => {
  let service: SearchTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
