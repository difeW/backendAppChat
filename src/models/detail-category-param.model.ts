import {Model, model, property} from '@loopback/repository';

@model()
export class DetailCategoryParam extends Model {
  @property({
    type: 'string',
    required: true,
  })
  uid: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  categories: string[];


  constructor(data?: Partial<DetailCategoryParam>) {
    super(data);
  }
}

export interface DetailCategoryParamRelations {
  // describe navigational properties here
}

export type DetailCategoryParamWithRelations = DetailCategoryParam & DetailCategoryParamRelations;
