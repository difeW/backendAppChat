import {Model, model, property} from '@loopback/repository';

@model()
export class FollowParam extends Model {
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
  followId?: string;


  constructor(data?: Partial<FollowParam>) {
    super(data);
  }
}

export interface FollowParamRelations {
  // describe navigational properties here
}

export type FollowParamWithRelations = FollowParam & FollowParamRelations;
