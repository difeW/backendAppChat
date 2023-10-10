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
import {DetailUserConected, Character} from '../models';
import {DetailUserConectedRepository, CharacterRepository} from '../repositories';

export class DetailUserConectedController {
  constructor(
    @repository(DetailUserConectedRepository)
    public detailUserConectedRepository: DetailUserConectedRepository,
    @repository(CharacterRepository)
    public characterRepository: CharacterRepository,
  ) { }

  @post('/detail-user-conecteds')
  @response(200, {
    description: 'DetailUserConected model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetailUserConected)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailUserConected, {
            title: 'NewDetailUserConected',
            exclude: ['conectedId'],
          }),
        },
      },
    })
    detailUserConected: Omit<DetailUserConected, 'conectedId'>,
  ): Promise<boolean> {
    ///check verify
    let check: DetailUserConected[] = await this.detailUserConectedRepository.find({
      where: {
        uid: detailUserConected.uid,
        characterId: detailUserConected.characterId,
      }
    })

    if (check.length > 0) {
      return false;
    }
    /// increse follow table character.
    let newCharacter: Character = await this.characterRepository.findById(detailUserConected.characterId);
    newCharacter.connectors = (newCharacter.connectors ?? 0) + 1;
    this.characterRepository.updateById(detailUserConected.characterId, newCharacter);

    this.detailUserConectedRepository.create(detailUserConected);
    return true;
  }

  @get('/detail-user-conecteds/count')
  @response(200, {
    description: 'DetailUserConected model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetailUserConected) where?: Where<DetailUserConected>,
  ): Promise<Count> {
    return this.detailUserConectedRepository.count(where);
  }

  @get('/detail-user-conecteds')
  @response(200, {
    description: 'Array of DetailUserConected model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetailUserConected, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string("uid") uid: string,
  ): Promise<Character[]> {
    let listCharacterId: DetailUserConected[] = (await this.detailUserConectedRepository.find({where: {uid: uid}}));

    let characterConnected: Character[] = await this.characterRepository.find({
      where: {
        characterId: {inq: listCharacterId.map((e) => e.characterId)}
      }
    })

    const array2 = listCharacterId.sort((a, b) => (b.connectAt?.getTime() ?? 0) - (a.connectAt?.getTime() ?? 0));

    // Tạo một đối tượng ánh xạ từ tên đến vị trí trong mảng 2
    const indexMap: {[key: string]: number} = {};
    array2.forEach((item, index) => {
      indexMap[item.characterId] = index;
    });

    // Sắp xếp mảng 1 bằng cách sử dụng đối tượng ánh xạ
    characterConnected.sort((a, b) => indexMap[a.characterId ?? ""] - indexMap[b.characterId ?? ""]);

    return characterConnected;
  }

  @patch('/detail-user-conecteds')
  @response(200, {
    description: 'DetailUserConected PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailUserConected, {partial: true}),
        },
      },
    })
    detailUserConected: DetailUserConected,
    @param.where(DetailUserConected) where?: Where<DetailUserConected>,
  ): Promise<Count> {
    return this.detailUserConectedRepository.updateAll(detailUserConected, where);
  }

  @get('/detail-user-conecteds/{id}')
  @response(200, {
    description: 'DetailUserConected model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetailUserConected, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetailUserConected, {exclude: 'where'}) filter?: FilterExcludingWhere<DetailUserConected>
  ): Promise<DetailUserConected> {
    return this.detailUserConectedRepository.findById(id, filter);
  }

  @patch('/detail-user-conecteds/{id}')
  @response(204, {
    description: 'DetailUserConected PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailUserConected, {partial: true}),
        },
      },
    })
    detailUserConected: DetailUserConected,
  ): Promise<void> {
    await this.detailUserConectedRepository.updateById(id, detailUserConected);
  }

  @put('/detail-user-conecteds/{id}')
  @response(204, {
    description: 'DetailUserConected PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detailUserConected: DetailUserConected,
  ): Promise<void> {
    await this.detailUserConectedRepository.replaceById(id, detailUserConected);
  }

  @del('/detail-user-conecteds/{id}')
  @response(204, {
    description: 'DetailUserConected DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detailUserConectedRepository.deleteById(id);
  }
}
