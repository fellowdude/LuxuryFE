import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { InformationModalComponent } from 'src/app/modals/information-modal/information-modal.component';
import { IProductDetailPage } from 'src/app/models/product.model';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { RateProductService } from 'src/app/services/rate-product.service';

var preview = false;
@Component({
  selector: 'app-product-detail-header',
  templateUrl: './product-detail-header.component.html',
  styleUrls: ['./product-detail-header.component.scss'],
  styles: [],
})
export class ProductDetailHeaderComponent implements OnInit {
  initialRating: number = 4;
  loading: boolean = false;
  @Input() productDetail: IProductDetailPage;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private rateProductService: RateProductService,
    private toastrCtrl: ToastrControllerService
  ) {}

  ngOnInit(): void {
    if(window.location.href.indexOf('preview') != -1){
      preview = true;
    } else {
      preview = false;
    }
    this.initialRating = this.productDetail.userRating || 4;
  }

  openModal(): void {
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
        modalTitle: this.productDetail.deliveryInformation.deliveryTitle,
        modalBody: this.productDetail.deliveryInformation.deliveryBody,
      },
    });
  }

  rateProduct(ranking: number) {
    if(preview) return;
    if (this.productDetail.userRating) return;
    this.loading = true;

    this.rateProductService
      .rateProduct(this.productDetail._id, ranking)
      .subscribe((resp) => {
        this.toastrCtrl.successToastr(
          Messages.successProductScoreSend,
          Messages.successTitle
        );
        this.initialRating = ranking;
        this.productDetail.userRating = ranking;
        this.loading = false;
      });
  }
}
