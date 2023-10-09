import {Entity, model, property} from '@loopback/repository';
import {CharacterParam} from './character-param.model';

@model()
export class Character extends Entity {
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


  constructor(data?: Partial<Character>) {
    super(data);
  }

  static convert(param: CharacterParam): Character {
    let newCharacter = new Character();
    newCharacter.connectors = param.connectors;
    newCharacter.followers = param.followers;
    newCharacter.hello = param.hello;
    newCharacter.intro = param.intro;
    newCharacter.linkURL = param.linkURL;
    newCharacter.name = param.name;
    newCharacter.prompt = param.prompt;
    return newCharacter;
  }
}

export interface CharacterRelations {
  // describe navigational properties here
}

export type CharacterWithRelations = Character & CharacterRelations;
