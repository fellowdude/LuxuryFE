import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategorySimple } from 'src/app/models/category-page.model';
import { ICompanyPage } from 'src/app/models/company.model';
import { IMagazinePrestigeCard } from 'src/app/models/magazine-prestige-card.model';
import { IPartnerBenefitsCompanyPage } from 'src/app/resolvers/core/partner-benefits/company.resolver';
import { CategorySelectService } from 'src/app/services/internal/category-select.service';
import { PartnerBenefitsTransformService } from 'src/app/services/internal/partner-benefits-transform.service';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ImageGalleryComponent } from 'src/app/modals/image-gallery/image-gallery.component';
import { InformationModalComponent } from 'src/app/modals/information-modal/information-modal.component';
import { IFakeFilterList } from 'src/app/models/filter.model';
import { StoreTransformService } from 'src/app/services/internal/store-transform.service';
import { ExperiencesService } from 'src/app/services/experiences.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data[
      'resolved'
    ] as IPartnerBenefitsCompanyPage;
  }

  companyPage: ICompanyPage;
  listCategories: Array<ICategorySimple> = [];
  magazinePrestigeList: IMagazinePrestigeCard[];
  breadcrumb: Array<IBreadcrumbItem>;
  modalRef: MDBModalRef;
  fakeFilterList: Array<IFakeFilterList>;
  currentCategory: any;
  activeFilter: boolean = false;
  loadingExperiences: boolean = false;
  filterUsed: any;
  filterObject: any;
  currentPage: number = 0;
  filters: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private partnerBenefitsTransformService: PartnerBenefitsTransformService,
    private categoriesSelectService: CategorySelectService,
    private modalService: MDBModalService,
    private storeTransformService: StoreTransformService,
    private experienceService: ExperiencesService
  ) {}

  ngOnInit(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    let fullUrl = this.router.url.split('/');
    this.breadcrumb = [
      {
        name: this.resolvedData?.categoriesData?.categoryGroupName,
        link: '/beneficios/' + fullUrl[2],
      },
      {
        name: this.resolvedData.companyInfo.categories.find(
          (el) => el.friendly_url === fullUrl[4]
        ).name,
        link: '/beneficios/' + fullUrl[2] + '/categoria/' + fullUrl[4],
      },
      {
        name: this.resolvedData.companyInfo.name,
        link: urlWithoutParams,
      },
    ];
    this.companyPage = this.partnerBenefitsTransformService.transformCompany(
      this.resolvedData.companyInfo,
      urlWithoutParams + '/beneficio/'
    );
    this.listCategories = this.categoriesSelectService.formatCategoryListToSelect(
      this.resolvedData.categoriesData,
      '/beneficios/' + this.activeRoute.snapshot.params['group'] + '/categoria/'
    );
    this.currentCategory = { ...this.resolvedData.categoriesData.data.find(el => el.friendly_url === fullUrl[4]) };
    this.filters = this.storeTransformService.transformCategoryFilters(this.currentCategory.filters);
    this.fakeFilterList = [];
  }

  showInformation(): void {
    this.modalRef = this.modalService.show(InformationModalComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-information modal-dialog modal-dialog-centered',
      containerClass: 'modal fade',
      ignoreBackdropClick: false,
      data: {
        modalTitle: 'Información de la marca',
        modalBody: this.companyPage.description,
        innerBody: true,
      },
    });
  }

  showMediaGalery(): void {
    this.modalRef = this.modalService.show(ImageGalleryComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-information modal-dialog modal-dialog-centered modal-lg',
      containerClass: 'modal fade',
      ignoreBackdropClick: false,
      data: {
        modalTitle: 'Galería',
        imageList: this.companyPage.images_link,
        videoList: this.companyPage.videos_link,
        url_attachment: this.companyPage.url_attachment,
      },
    });
  }

  sendFilterData(event) {
    this.activeFilter = false;
    Object.keys(event).forEach((el) => {
      if (event[el]?.used) {
        this.activeFilter = true;
      }
    });
    if(this.activeFilter) {
      this.loadingExperiences = true;
      this.filterUsed = event;
      this.filterObject = {
        filters: event,
        category_id: this.currentCategory._id,
        experience_id: this.companyPage._id
      };
      this.currentPage = 1;
      this.loadFilterAct();
    } else {
      this.companyPage = this.partnerBenefitsTransformService.transformCompany(
        this.resolvedData.companyInfo,
        '/beneficios/' + this.activeRoute.snapshot.params['group'] + '/categoria/' +
        this.currentCategory.friendly_url + '/empresa/' + this.resolvedData.companyInfo.friendly_url + '/beneficio/'
      );
      this.filters = this.storeTransformService.transformCategoryFilters(this.currentCategory.filters);
    }
  }

  loadFilterAct() {
    this.loadingExperiences = true;
    this.experienceService.getActByFilter(
      this.filterObject
    ).subscribe((result: any) => {
      this.setActivationsFiltered(result)
      this.loadingExperiences = false;
    })
  }

  setActivationsFiltered(result: any): void {
    if(result) {
      this.companyPage.experiences = result.activations.data.map((act) => ({
        backgroundUrl: this.companyPage.url_attachment + act.image_thumbnail,
        link: '/beneficios/' + this.activeRoute.snapshot.params['group'] + '/categoria/' +
        this.currentCategory.friendly_url + '/empresa/' + this.resolvedData.companyInfo.friendly_url +
        '/beneficio/' + act.slug,
        slug: act.slug,
        title: act.title,
        _id: act._id
      }));
      //this.filters = this.storeTransformService.transformCategoryFiltersFiltered(result.filters, this.filterUsed);
    }
  }
}
