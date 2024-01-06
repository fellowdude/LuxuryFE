import { TestBed } from '@angular/core/testing';

import { ArticlesFormatService } from './articles-format.service';

describe('ArticlesFormatService', () => {
  let service: ArticlesFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
