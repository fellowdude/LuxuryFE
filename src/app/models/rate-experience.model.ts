export interface IRateExperienceFormField {
  _id?: string;
  field: string;
  list?: string[];
  name: string;
  required: boolean;
  size: number;
  type: string;
}

export interface IRateExperienceFormModal {
  _id: string;
  buttonText: string;
  endPoint: string;
  requestFields: IRateExperienceFormField[];
  title: string;
}
