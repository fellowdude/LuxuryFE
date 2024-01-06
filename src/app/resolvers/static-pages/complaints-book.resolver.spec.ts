import { TestBed } from '@angular/core/testing';

import { ComplaintsBookResolver } from './complaints-book.resolver';

describe('ComplaintsBookResolver', () => {
  let resolver: ComplaintsBookResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ComplaintsBookResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
