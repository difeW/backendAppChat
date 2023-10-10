import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {DetailUserConected, DetailUserConectedRelations} from '../models';

export class DetailUserConectedRepository extends DefaultCrudRepository<
  DetailUserConected,
  typeof DetailUserConected.prototype.conectedId,
  DetailUserConectedRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(DetailUserConected, dataSource);
  }
}
