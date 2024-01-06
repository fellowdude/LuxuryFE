import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {
  @ViewChild('gallery', { static: false }) gallery?: SwiperDirective;
  @ViewChild('thumbnails', { static: false }) thumbnails?: SwiperDirective;
  modalTitle: string;
  imageList: Array<any>;
  url_attachment: string;
  videoList: Array<any>;
  lastId: number;
  swiperConfig: SwiperConfigInterface = {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: undefined,
    },
  };
  thumbConfig: SwiperConfigInterface = {
    spaceBetween: 10,
    slidesPerView: 4,
  };

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {
    this.lastId = 0;
  }

  ngAfterViewInit(): void {
    const imagesSwiper = this.gallery.swiper();
    const thumbsSwiper = this.thumbnails.swiper();
    imagesSwiper.thumbs.swiper = thumbsSwiper;
    imagesSwiper.thumbs.init();
    imagesSwiper.thumbs.update();
  }

  hideModal(): void {
    this.stopVideos();
    this.modalRef.hide();
  }

  prueba(): void {
    if (this.lastId >= this.imageList.length) {
      this.stopVideos();
    }
    console.log(this.lastId, this.gallery.getIndex())
    if(this.lastId < this.gallery.getIndex()){
      this.thumbnails.nextSlide();
    }else{
      this.thumbnails.prevSlide();
    }
    this.lastId = this.gallery.getIndex();

  }

  stopVideos() {
    var videos = document.querySelectorAll('iframe, video');
    Array.prototype.forEach.call(videos, function (video) {
      if (video.tagName.toLowerCase() === 'video') {
        video.pause();
      } else {
        var src = video.src;
        video.src = src;
      }
    });
  }

  getVideoThumbnail(url) {
    let video;
    let results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];
    return 'http://i3.ytimg.com/vi/' + video + '/hqdefault.jpg';
  }
}
