import {Entity, model, property} from '@loopback/repository';

@model()
export class DetailUserConected extends Entity {
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
    type: 'string',
    id: true,
    generated: true,
  })
  conectedId?: string;

  @property({
    type: 'date',
    default: new Date()
  })
  connectAt?: Date;

  constructor(data?: Partial<DetailUserConected>) {
    super(data);
  }
}

export interface DetailUserConectedRelations {
  // describe navigational properties here
}

export type DetailUserConectedWithRelations = DetailUserConected & DetailUserConectedRelations;
