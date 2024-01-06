import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private apiService: ApiService) {}

  getCarouselData(carouselName: string) {
    return this.apiService.getLogged(`/block/data/${carouselName}`);
  }
}
