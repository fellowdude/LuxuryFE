import { TestBed } from '@angular/core/testing';

import { PartnerBenefitsTransformService } from './partner-benefits-transform.service';

describe('PartnerBenefitsTransformService', () => {
  let service: PartnerBenefitsTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerBenefitsTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
