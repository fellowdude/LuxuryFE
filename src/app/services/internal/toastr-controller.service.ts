import { Injectable } from '@angular/core';
import { ToastrConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrControllerService {
  config = {
    timeOut: 3000,
    progressBar: true,
  };

  constructor(private toastrService: ToastrService) {}

  successToastr(
    content: string,
    header: string,
    config: any = this.config
  ): void {
    this.toastrService.success(content, header, config);
  }

  warningToastr(
    content: string,
    header: string,
    config: any = this.config
  ): void {
    this.toastrService.warning(content, header, config);
  }

  errorToastr(
    content: string,
    header: string,
    config: any = this.config
  ): void {
    this.toastrService.error(content, header, config);
  }
}
