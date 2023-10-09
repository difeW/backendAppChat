import {Model, model, property} from '@loopback/repository';

@model()
export class CharacterParam extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  characterId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  linkURL: string;

  @property({
    type: 'string',
    required: true,
  })
  prompt: string;

  @property({
    type: 'string',
    required: true,
  })
  hello: string;

  @property({
    type: 'string',
    required: true,
  })
  intro: string;

  @property({
    type: 'number',
    default: 0,
  })
  connectors?: number;

  @property({
    type: 'number',
    default: 0,
  })
  followers?: number;

  @property({
    type: 'string',
    default: "system",
  })
  uid?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  categoryIds: string[];


  constructor(data?: Partial<CharacterParam>) {
    super(data);
  }
}

export interface CharacterParamRelations {
  // describe navigational properties here
}

export type CharacterParamWithRelations = CharacterParam & CharacterParamRelations;
