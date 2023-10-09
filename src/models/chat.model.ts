import {Entity, model, property} from '@loopback/repository';

@model()
export class Chat extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  chatId?: string;

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
    required: true,
  })
  content: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCharacter: boolean;

  @property({
    type: 'date',
    generated: true,
  })
  createAt: Date;


  constructor(data?: Partial<Chat>) {
    super(data);
  }
}

export interface ChatRelations {
  // describe navigational properties here
}

export type ChatWithRelations = Chat & ChatRelations;
