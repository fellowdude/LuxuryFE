import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICardListItem } from 'src/app/models/card-list.model';
import { ICategoryGroupPage } from 'src/app/models/category-group.model';
import { IStoreCategoryGroup } from 'src/app/resolvers/core/store/category-group.resolver';
import { CardListService } from 'src/app/services/internal/card-list.service';
import { StoreTransformService } from 'src/app/services/internal/store-transform.service';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { PopupTransformService } from 'src/app/services/internal/popup-transform.service';
import { IPopup } from 'src/app/models/popup.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryGroupComponent implements OnInit {
  get resolvedData() {
    return this.activeRoute.snapshot.data.resolved as IStoreCategoryGroup;
  }

  breadcrumb: Array<IBreadcrumbItem>;
  cardList: Array<ICardListItem> = [];
  categoryGroup: ICategoryGroupPage;
  groupName: string;
  modalRef: MDBModalRef;
  popupData: IPopup | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private cardListService: CardListService,
    private modalService: MDBModalService,
    private popupTransformService: PopupTransformService,
    private router: Router,
    private storeTransformService: StoreTransformService,
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((resp) => {
      this.groupName = resp.group;
    });

    this.categoryGroup = this.storeTransformService.transformCategoryGroup(
      this.resolvedData
    );

    // popup
    if (this.resolvedData.popupData) {
      this.popupData = this.popupTransformService.transformPopup(
        this.resolvedData.popupData
      );

      if (!sessionStorage.getItem('popup_' + this.groupName)) {
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

    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    // breadcrumb
    this.breadcrumb = [
      {
        name: this.resolvedData.categoriesData.categoryGroupName,
        link: urlWithoutParams,
      },
    ];
    // cardList
    this.cardList = this.cardListService.categoryGroupCardListFormat(
      urlWithoutParams,
      this.resolvedData.categoriesData,
      this.resolvedData.campaignData
    );
  }
}
