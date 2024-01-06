import { TestBed } from '@angular/core/testing';

import { ContactFormTransformService } from './contact-form-transform.service';

describe('ContactFormTransformService', () => {
  let service: ContactFormTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactFormTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
