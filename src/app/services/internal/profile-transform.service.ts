import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileTransformService {
  constructor() {}
  profileTransform(userInfo: any) {
    return {
      _id: userInfo._id,
      birth_date: userInfo.birth_date,
      dni: userInfo.dni,
      email: userInfo.username,
      last_name_father: userInfo.last_name_father,
      last_name_mother: userInfo.last_name_mother,
      name: userInfo.name,
      number_card: userInfo.number_card,
      number_document: userInfo.number_document,
      phone: userInfo.phone,
      suffix: userInfo.suffix,
      type_document: userInfo.type_document,
      username: userInfo.username,
    };
  }
}
