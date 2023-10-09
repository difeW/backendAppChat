import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {DetailCategory, DetailCategoryRelations} from '../models';

export class DetailCategoryRepository extends DefaultCrudRepository<
  DetailCategory,
  typeof DetailCategory.prototype.detailCategoryId,
  DetailCategoryRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(DetailCategory, dataSource);
  }
}
