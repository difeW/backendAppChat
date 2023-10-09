import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {Chat, ChatRelations} from '../models';

export class ChatRepository extends DefaultCrudRepository<
  Chat,
  typeof Chat.prototype.chatId,
  ChatRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(Chat, dataSource);
  }
}
