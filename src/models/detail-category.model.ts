import {Entity, model, property} from '@loopback/repository';

@model()
export class DetailCategory extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  uid: string;

  @property({
    type: 'string',
    id: true,
    required: false,
    generated: true,
  })
  detailCategoryId: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryId: string;


  constructor(data?: Partial<DetailCategory>) {
    super(data);
  }
}

export interface DetailCategoryRelations {
  // describe navigational properties here
}

export type DetailCategoryWithRelations = DetailCategory & DetailCategoryRelations;
