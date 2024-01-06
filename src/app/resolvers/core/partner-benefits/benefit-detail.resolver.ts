import { BenefitService } from 'src/app/services/benefit.service';
import { CompanyService } from 'src/app/services/company.service';
import { IPartnerBenefitsCompany } from './company.resolver';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BenefitDetailResolver
  implements Resolve<Observable<IPartnerBenefitsCompanyDetail>> {
  constructor(
    private benefitService: BenefitService,
    private companyService: CompanyService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IPartnerBenefitsCompanyDetail> {
    const company = route.paramMap.get('company');
    const benefit = route.paramMap.get('benefit');
    return zip(
      this.benefitService.getBenefit(company, benefit),
      this.companyService.getCompany(company)
    ).pipe(
      tap(([benefitDetail]) => {
        if (!benefitDetail) {
          this.toastr.warning('La página no existe', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
          });
          this.router.navigate(['/inicio']);
          return;
        }
      }),
      map(([benefitDetail, companyData]) => {
        return {
          benefitDetail,
          companyData,
        };
      })
    );
  }
}

export interface IPartnerBenefitsCompanyDetail {
  benefitDetail: IPartnerBenefitsDetail;
  companyData: IPartnerBenefitsCompany;
}

export interface IPartnerBenefitsDetail {
  _id: string;
  active: boolean;
  categories: Category[];
  company_description: Description[];
  company_friendly_url: string;
  company_images: Array<string>;
  company_logo: string;
  company_name: string;
  company_videos: Array<string>;
  description: Description[];
  image_description: string;
  image_description_mobile: string;
  image_thumbnail: string;
  image_thumbnail_mobile: string;
  listPrice: ListPrice[];
  slug: string;
  title: string;
  url_attachment: string;
}

export interface Category {
  _id: string;
  friendly_url: string;
  name: string;
}

export interface Description {
  description: string;
  field: string;
  title: string;
}

export interface ListPrice {
  _id: string;
  active: boolean;
  code: string;
  value: string;
}
