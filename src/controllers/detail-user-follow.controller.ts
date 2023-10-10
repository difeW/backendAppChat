import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Character, DetailUserFollow, FollowParam} from '../models';
import {CharacterRepository, DetailUserFollowRepository} from '../repositories';

export class DetailUserFollowController {
  constructor(
    @repository(DetailUserFollowRepository)
    public detailUserFollowRepository: DetailUserFollowRepository,
    @repository(CharacterRepository)
    public characterRepository: CharacterRepository,
  ) { }

  @post('/detail-user-follows')
  @response(200, {
    description: 'DetailUserFollow model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetailUserFollow)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailUserFollow, {
            title: 'NewDetailUserFollow',
            exclude: ['id'],
          }),
        },
      },
    })
    detailUserFollow: Omit<DetailUserFollow, 'id'>,
  ): Promise<DetailUserFollow> {

    return this.detailUserFollowRepository.create(detailUserFollow);
  }

  @get('/detail-user-follows/count')
  @response(200, {
    description: 'DetailUserFollow model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetailUserFollow) where?: Where<DetailUserFollow>,
  ): Promise<Count> {
    return this.detailUserFollowRepository.count(where);
  }

  @get('/detail-user-follows')
  @response(200, {
    description: 'Array of DetailUserFollow model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetailUserFollow, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string("uid") uid: string,
    @param.filter(DetailUserFollow) filter?: Filter<DetailUserFollow>,
  ): Promise<Character[]> {
    // find listCharacterFollow
    let listCharacterFollow: DetailUserFollow[] = await this.detailUserFollowRepository.find({
      where: {
        uid: uid
      }
    })

    let listCharacter: Character[] = await this.characterRepository.find({
      where: {
        characterId: {inq: listCharacterFollow.map((e) => e.characterId)}
      }
    })

    const array2 = listCharacterFollow.sort((a, b) => (a.followAt?.getTime() ?? 0) - (b.followAt?.getTime() ?? 0));

    // Tạo một đối tượng ánh xạ từ tên đến vị trí trong mảng 2
    const indexMap: {[key: string]: number} = {};
    array2.forEach((item, index) => {
      indexMap[item.characterId] = index;
    });

    // Sắp xếp mảng 1 bằng cách sử dụng đối tượng ánh xạ
    listCharacter.sort((a, b) => indexMap[a.characterId ?? ""] - indexMap[b.characterId ?? ""]);


    return listCharacter;
  }

  @patch('/detail-user-follows')
  @response(200, {
    description: 'DetailUserFollow PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailUserFollow, {partial: true}),
        },
      },
    })
    detailUserFollow: DetailUserFollow,
    @param.where(DetailUserFollow) where?: Where<DetailUserFollow>,
  ): Promise<Count> {
    return this.detailUserFollowRepository.updateAll(detailUserFollow, where);
  }

  @get('/detail-user-follows/{id}')
  @response(200, {
    description: 'DetailUserFollow model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetailUserFollow, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetailUserFollow, {exclude: 'where'}) filter?: FilterExcludingWhere<DetailUserFollow>
  ): Promise<DetailUserFollow> {
    return this.detailUserFollowRepository.findById(id, filter);
  }

  @patch('/detail-user-follows/{id}')
  @response(204, {
    description: 'DetailUserFollow PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailUserFollow, {partial: true}),
        },
      },
    })
    detailUserFollow: DetailUserFollow,
  ): Promise<void> {
    await this.detailUserFollowRepository.updateById(id, detailUserFollow);
  }

  @put('/detail-user-follows/{id}')
  @response(204, {
    description: 'DetailUserFollow PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detailUserFollow: DetailUserFollow,
  ): Promise<void> {
    await this.detailUserFollowRepository.replaceById(id, detailUserFollow);
  }

  @del('/detail-user-follows/{id}')
  @response(204, {
    description: 'DetailUserFollow DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detailUserFollowRepository.deleteById(id);
  }


  @patch('/unfollow')
  @response(200, {
    description: 'Character model instance',
    content: {'application/json': {schema: getModelSchemaRef(Character)}},
  })
  async unfollow(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FollowParam, {
            title: 'NewFollowParam',
            exclude: ['followId'],
          }),
        },
      },
    })
    followParam: Omit<FollowParam, "followId">,
  ): Promise<boolean> {


    ///check verify
    let check: DetailUserFollow[] = await this.detailUserFollowRepository.find({
      where: {
        uid: followParam.uid,
        characterId: followParam.characterId,
      }
    })

    if (check.length == 0) {
      return false;
    }

    // decrese follow table character.
    let newCharacter: Character = await this.characterRepository.findById(followParam.characterId);
    newCharacter.followers = (newCharacter.followers ?? 0) - 1;
    this.characterRepository.updateById(followParam.characterId, newCharacter);

    // delete column from table user follow.
    this.detailUserFollowRepository.deleteAll({
      characterId: followParam.characterId,
      uid: followParam.uid,
    });

    return true;
  }

  @patch('/follow')
  @response(200, {
    description: 'Character model instance',
    content: {'application/json': {schema: getModelSchemaRef(FollowParam)}},
  })
  async follow(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FollowParam, {
            title: 'NewFollowParam',
            exclude: ['followId'],
          }),
        },
      },
    })
    followParam: Omit<FollowParam, "followId">,
  ): Promise<boolean> {

    ///check verify
    let check: DetailUserFollow[] = await this.detailUserFollowRepository.find({
      where: {
        uid: followParam.uid,
        characterId: followParam.characterId,
      }
    })

    if (check.length > 0) {
      return false;
    }

    // insert column into table user follow.
    let detailUserFollow: DetailUserFollow = new DetailUserFollow();
    detailUserFollow.characterId = followParam.characterId
    detailUserFollow.uid = followParam.uid
    this.detailUserFollowRepository.create(detailUserFollow);

    /// increse follow table character.
    let newCharacter: Character = await this.characterRepository.findById(followParam.characterId);
    newCharacter.followers = (newCharacter.followers ?? 0) + 1;
    this.characterRepository.updateById(followParam.characterId, newCharacter);

    return true;
  }

}
