import { Injectable } from '@angular/core';
import { IRateExperienceFormModal } from 'src/app/models/rate-experience.model';
import {
  IRateExperienceReceived,
  RateExperienceService,
} from '../rate-experience.service';

@Injectable({
  providedIn: 'root',
})
export class RateExperienceTransformService {
  constructor() {}
  transformRateExperienceForm(
    rateExperienceReceived: IRateExperienceReceived
  ): IRateExperienceFormModal {
    return {
      _id: rateExperienceReceived._id,
      title: rateExperienceReceived.title,
      buttonText: rateExperienceReceived.button_text,
      requestFields: rateExperienceReceived.request_field.map(
        (requestField) => ({
          _id: requestField._id,
          size: requestField.size,
          name: requestField.name,
          type: requestField.type,
          field: requestField.field,
          required: requestField.required,
        })
      ),
      endPoint: rateExperienceReceived.end_point,
    };
  }
}
