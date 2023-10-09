import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {DetailCharacterCategory, DetailCharacterCategoryRelations} from '../models';

export class DetailCharacterCategoryRepository extends DefaultCrudRepository<
  DetailCharacterCategory,
  typeof DetailCharacterCategory.prototype.id,
  DetailCharacterCategoryRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(DetailCharacterCategory, dataSource);
  }
}
