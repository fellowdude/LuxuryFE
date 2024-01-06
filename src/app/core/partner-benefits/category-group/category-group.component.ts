import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICardListItem } from 'src/app/models/card-list.model';
import { IExperiencesPage } from 'src/app/models/experiences.model';
import { IPartnerBenefitsCategoryGroup } from 'src/app/resolvers/core/partner-benefits/category-group.resolver';
import { CardListService } from 'src/app/services/internal/card-list.service';
import { PartnerBenefitsTransformService } from 'src/app/services/internal/partner-benefits-transform.service';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PopupTransformService } from 'src/app/services/internal/popup-transform.service';
import { IPopup } from 'src/app/models/popup.model';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.scss'],
})
export class CategoryGroupComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data[
      'resolved'
    ] as IPartnerBenefitsCategoryGroup;
  }
  experiencesData: IExperiencesPage;
  cardList: Array<ICardListItem> = [];
  popupData: IPopup | null = null;
  groupName: string;
  breadcrumb: Array<IBreadcrumbItem>;
  modalRef: MDBModalRef;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private partnerBenefitsTransformService: PartnerBenefitsTransformService,
    private cardListService: CardListService,
    private popupTransformService: PopupTransformService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {

    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    this.activeRoute.params.subscribe((resp) => {
      this.groupName = resp.group;
    });

    this.breadcrumb = [
      {
        name: this.resolvedData?.categoriesData?.categoryGroupName,
        link: urlWithoutParams,
      },
    ];
    this.experiencesData = this.partnerBenefitsTransformService.transformCategoryGroup(
      this.resolvedData,
      urlWithoutParams + '/categoria/'
    );

    this.cardList = this.cardListService.categoryGroupCardListFormat(
      urlWithoutParams,
      this.resolvedData.categoriesData
    );

    // popup
    if (this.resolvedData.popupData) {
      this.popupData = this.popupTransformService.transformPopup(
        this.resolvedData.popupData
      );

      if (!sessionStorage.getItem('popup_' + this.groupName)) {
        // this.showPopup = true;
        // document.body.style.overflow = 'hidden';
        this.modalRef = this.modalService.show(PopupComponent, {
          animated: true,
          backdrop: true,
          keyboard: true,
          focus: true,
          show: false,
          class:
            'modal-information modal-dialog modal-dialog-centered mw-popup-container',
          containerClass: 'modal fade d-flex justify-content-center d-md-block',
          ignoreBackdropClick: false,
          data: {
            popupData: this.popupData,
          },
        });

        sessionStorage.setItem(
          'popup_' + this.groupName,
          'popup_' + this.groupName
        );
      }
    }
  }
}
