import { TestBed } from '@angular/core/testing';

import { ToastrControllerService } from './toastr-controller.service';

describe('ToastrControllerService', () => {
  let service: ToastrControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
