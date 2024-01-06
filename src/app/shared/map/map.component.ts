import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { IAddressInfo } from 'src/app/models/shared.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  @Input() addressList: Array<IAddressInfo>;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
    zoom: 16,
  };
  markerOptions: google.maps.MarkerOptions = {
    icon: 'assets/images/map-marker.svg',
  };
  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1.3,
    spaceBetween: 15,
    autoplay: {
      delay: 2000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
    },
  };

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' +
          Constants.GOOGLE_MAPS_KEY,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    this.center = {
      lat: this.addressList[0].lat,
      lng: this.addressList[0].long,
    };
    this.addressList[0].selected = true;
  }

  changeLocation(position: number) {
    this.center = {
      lat: this.addressList[position].lat,
      lng: this.addressList[position].long,
    };
    for (let i = 0; i < this.addressList.length; ++i) {
      if (i == position) this.addressList[position].selected = true;
      else this.addressList[i].selected = false;
    }
  }
}
