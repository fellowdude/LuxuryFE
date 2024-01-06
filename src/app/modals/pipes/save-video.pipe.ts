import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: 'saveVideo'
})
export class SaveVideoPipe implements PipeTransform {

  urlCache = new Map<string, SafeResourceUrl>();
  constructor(private _sanitizer: DomSanitizer) {}

  transform(url: any): SafeResourceUrl {
    let video;
    let results;

    if (url === null) {
      return this._sanitizer.bypassSecurityTrustResourceUrl("");
    }
    results = url.match("[\\?&]v=([^&#]*)");
    video = results === null ? url : results[1];
    let urlEnd = this.urlCache.get(video);
    if (!urlEnd) {
      urlEnd = this._sanitizer.bypassSecurityTrustResourceUrl(
        "https://www.youtube.com/embed/" + video + "?enablejsapi=1"
      );
      this.urlCache.set(video, urlEnd);
      return urlEnd;
    }else{
      return urlEnd;
    }
  }

}
