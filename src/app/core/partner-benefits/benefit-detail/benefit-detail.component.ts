import { Component, OnInit } from '@angular/core';
import { IBenefitData } from 'src/app/models/benefits.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { BenefitFormComponent } from 'src/app/modals/benefit-form/benefit-form.component';
import { IPartnerBenefitsCompanyDetail } from 'src/app/resolvers/core/partner-benefits/benefit-detail.resolver';
import { PartnerBenefitsTransformService } from 'src/app/services/internal/partner-benefits-transform.service';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { ImageGalleryComponent } from 'src/app/modals/image-gallery/image-gallery.component';
import { InformationModalComponent } from 'src/app/modals/information-modal/information-modal.component';

@Component({
  selector: 'app-benefit-detail',
  templateUrl: './benefit-detail.component.html',
  styleUrls: ['./benefit-detail.component.scss'],
})
export class BenefitDetailComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data[
      'resolved'
    ] as IPartnerBenefitsCompanyDetail;
  }

  benefitData: IBenefitData;
  modalRef: MDBModalRef;
  breadcrumb: Array<IBreadcrumbItem>;

  constructor(
    private activeRoute: ActivatedRoute,
    private modalService: MDBModalService,
    private partnerBenefitsTransformService: PartnerBenefitsTransformService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    this.benefitData = this.partnerBenefitsTransformService.transformBenefitDetail(
      this.resolvedData
    );

    let fullUrl = this.router.url.split('/');
    this.breadcrumb = [
      {
        name: 'Experiencias',
        link: '/beneficios/' + fullUrl[2],
      },
      {
        name: this.resolvedData.benefitDetail.categories.find(
          (el) => el.friendly_url === fullUrl[4]
        ).name,
        link: '/beneficios/' + fullUrl[2] + '/categoria/' + fullUrl[4],
      },
      {
        name: this.resolvedData.benefitDetail.company_name,
        link:
          '/beneficios/' +
          fullUrl[2] +
          '/categoria/' +
          fullUrl[4] +
          '/empresa/' +
          fullUrl[6],
      },
      {
        name: this.resolvedData.benefitDetail.title,
        link: urlWithoutParams,
      },
    ];
  }

  openExperienceForm(id: string): void {
    this.modalRef = this.modalService.show(BenefitFormComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      ignoreBackdropClick: false,
      data: {
        idForm: id,
        companyInfo: this.resolvedData.companyData,
        benefitInfo: this.resolvedData.benefitDetail,
        isRestaurant: this.resolvedData.benefitDetail.categories.find((a) => {
          return (
            a.friendly_url === 'restaurantes_y_bares' ||
            a.friendly_url === 'restaurantes' ||
            a.friendly_url === 'bares'
          );
        })
          ? true
          : false,
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
      ignoreBackdropClick: true,
      data: {
        modalTitle: 'Galería',
        imageList: this.benefitData.company_images,
        videoList: this.benefitData.company_videos,
        url_attachment: this.benefitData.url_attachment,
      },
    });
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
        modalBody: this.benefitData.company_description,
        innerBody: true,
      },
    });
  }
}
