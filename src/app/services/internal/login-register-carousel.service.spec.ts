import { TestBed } from '@angular/core/testing';

import { LoginRegisterCarouselService } from './login-register-carousel.service';

describe('LoginRegisterCarouselService', () => {
  let service: LoginRegisterCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRegisterCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
