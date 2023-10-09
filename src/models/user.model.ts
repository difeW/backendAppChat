import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  uid: string;

  @property({
    type: 'string',
    default: undefined,
  })
  displayName?: string;

  @property({
    type: 'date',
    default: undefined,
  })
  createAt?: string;

  @property({
    type: 'string',
    default: undefined,
  })
  email?: string;

  @property({
    type: 'boolean',
    default: undefined,
  })
  emailVerified?: string;

  @property({
    type: 'boolean',
    default: undefined,
  })
  isAnonymous?: string;

  @property({
    type: 'string',
    default: undefined,
  })
  phoneNumber?: string;

  @property({
    type: 'string',
    default: undefined,
  })
  photoURL?: string;

  @property({
    type: 'string',
    default: undefined,
  })
  refreshToken?: string;

  @property({
    type: 'string',
  })
  tenantID?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
