import { TestBed } from '@angular/core/testing';

import { FooterInformationService } from './footer-information.service';

describe('FooterInformationService', () => {
  let service: FooterInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
