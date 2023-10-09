import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {Character, CharacterRelations} from '../models';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.characterId,
  CharacterRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(Character, dataSource);
  }
}
