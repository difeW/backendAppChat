import {Entity, model, property} from '@loopback/repository';

@model()
export class DetailCharacterCategory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  characterId: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryId: string;


  constructor(data?: Partial<DetailCharacterCategory>) {
    super(data);
  }
}

export interface DetailCharacterCategoryRelations {
  // describe navigational properties here
}

export type DetailCharacterCategoryWithRelations = DetailCharacterCategory & DetailCharacterCategoryRelations;
