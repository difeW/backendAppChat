import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {DetailUserFollow, DetailUserFollowRelations} from '../models';

export class DetailUserFollowRepository extends DefaultCrudRepository<
  DetailUserFollow,
  typeof DetailUserFollow.prototype.id,
  DetailUserFollowRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(DetailUserFollow, dataSource);
  }
}
