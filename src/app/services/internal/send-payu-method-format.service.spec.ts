import { TestBed } from '@angular/core/testing';

import { SendPayuMethodFormatService } from './send-payu-method-format.service';

describe('SendPayuMethodFormatService', () => {
  let service: SendPayuMethodFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendPayuMethodFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
