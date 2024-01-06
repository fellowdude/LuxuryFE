import { TestBed } from '@angular/core/testing';

import { CategoryGroupResolver } from './category-group.resolver';

describe('CategoryGroupResolver', () => {
  let resolver: CategoryGroupResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoryGroupResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
