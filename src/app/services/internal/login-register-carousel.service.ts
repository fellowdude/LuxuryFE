import { Injectable } from '@angular/core';
import { ILoginRegisterCarouselItem } from 'src/app/models/login-register-carousel';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterCarouselService {

  constructor() { }

  formatData(raw: Array<any> = []): Array<ILoginRegisterCarouselItem>{
    let result: Array<ILoginRegisterCarouselItem> = [];
    let item: ILoginRegisterCarouselItem
    raw.forEach( (e)=> {
      item = {
        image: e?.url_attachment + e?.image_intro,
        text: e?.description,
        title: e?.name
      }
      result.push(item);
    })
    return result;
  }
}
