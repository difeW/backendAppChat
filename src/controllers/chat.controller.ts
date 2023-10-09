import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Chat} from '../models';
import {ChatRepository} from '../repositories';

export class ChatController {
  constructor(
    @repository(ChatRepository)
    public chatRepository: ChatRepository,
  ) { }

  @post('/chats')
  @response(200, {
    description: 'Chat model instance',
    content: {'application/json': {schema: getModelSchemaRef(Chat)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {
            title: 'NewChat',
            exclude: ['chatId'],
          }),
        },
      },
    })
    chat: Omit<Chat, 'chatId'>,
  ): Promise<Chat> {
    return this.chatRepository.create(chat);
  }

  @get('/chats/count')
  @response(200, {
    description: 'Chat model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Chat) where?: Where<Chat>,
  ): Promise<Count> {
    return this.chatRepository.count(where);
  }

  @get('/chats')
  @response(200, {
    description: 'Array of Chat model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Chat, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string("uid") uid: string,
    @param.query.string("characterId") characterId: string,
  ): Promise<Chat[]> {
    let chatList: Chat[] = await this.chatRepository.find({
      where: {
        characterId: characterId,
        uid: uid,
      }
    })
    chatList.sort((a, b) => a.createAt.getTime() - b.createAt.getTime());
    return chatList;
  }

  @patch('/chats')
  @response(200, {
    description: 'Chat PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {partial: true}),
        },
      },
    })
    chat: Chat,
    @param.where(Chat) where?: Where<Chat>,
  ): Promise<Count> {
    return this.chatRepository.updateAll(chat, where);
  }

  @get('/chats/{id}')
  @response(200, {
    description: 'Chat model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Chat, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Chat, {exclude: 'where'}) filter?: FilterExcludingWhere<Chat>
  ): Promise<Chat> {
    return this.chatRepository.findById(id, filter);
  }

  @patch('/chats/{id}')
  @response(204, {
    description: 'Chat PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {partial: true}),
        },
      },
    })
    chat: Chat,
  ): Promise<void> {
    await this.chatRepository.updateById(id, chat);
  }

  @put('/chats/{id}')
  @response(204, {
    description: 'Chat PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chat: Chat,
  ): Promise<void> {
    await this.chatRepository.replaceById(id, chat);
  }

  @del('/chats/{id}')
  @response(204, {
    description: 'Chat DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.chatRepository.deleteById(id);
  }
}
