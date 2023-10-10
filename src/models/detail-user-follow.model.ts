import {Entity, model, property} from '@loopback/repository';

@model()
export class DetailUserFollow extends Entity {
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
  uid: string;

  @property({
    type: 'string',
    required: true,
  })
  characterId: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  followAt: Date;

  constructor(data?: Partial<DetailUserFollow>) {
    super(data);
  }
}

export interface DetailUserFollowRelations {
  // describe navigational properties here
}

export type DetailUserFollowWithRelations = DetailUserFollow & DetailUserFollowRelations;
