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
import {Character, CharacterParam, DetailCharacterCategory, DetailUserFollow} from '../models';
import {CharacterRepository, DetailCharacterCategoryRepository, DetailUserFollowRepository} from '../repositories';

export class CharacterController {
  constructor(
    @repository(CharacterRepository)
    public characterRepository: CharacterRepository,
    @repository(DetailCharacterCategoryRepository)
    public detailCharacterCategoryRepository: DetailCharacterCategoryRepository,
    @repository(DetailUserFollowRepository)
    public detailUserFollowRepository: DetailUserFollowRepository
  ) { }

  @post('/characters')
  @response(200, {
    description: 'Character model instance',
    content: {'application/json': {schema: getModelSchemaRef(Character)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterParam, {
            title: 'NewCharacter',
            exclude: ['characterId'],
          }),
        },
      },
    })
    characterParam: Omit<CharacterParam, "characterId">,
  ): Promise<CharacterParam> {
    let newCharacter: Character = Character.convert(characterParam);

    /// add character into Character table.
    let characterAdded: Character = await this.characterRepository.create(newCharacter);

    /// add category of character into DetailCharacterCategory table
    let categoryIds: string[] = characterParam.categoryIds ?? [];
    let detailCharacterCategorys: DetailCharacterCategory[] = [];
    for (let i: number = 0; i < categoryIds.length; i++) {
      detailCharacterCategorys.push(new DetailCharacterCategory({
        categoryId: categoryIds[i],
        characterId: characterAdded.characterId,
      }))
    }
    this.detailCharacterCategoryRepository.createAll(detailCharacterCategorys);
    return characterParam;
  }

  @get('/characters/count')
  @response(200, {
    description: 'Character model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Character) where?: Where<Character>,
  ): Promise<Count> {
    return this.characterRepository.count(where);
  }

  @get('/characters')
  @response(200, {
    description: 'Array of Character model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Character, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Character) filter?: Filter<Character>,
  ): Promise<Character[]> {
    return this.characterRepository.find(filter);
  }

  @patch('/characters')
  @response(200, {
    description: 'Character PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Character, {partial: true}),
        },
      },
    })
    character: Character,
    @param.where(Character) where?: Where<Character>,
  ): Promise<Count> {
    return this.characterRepository.updateAll(character, where);
  }

  @get('/characters/{id}')
  @response(200, {
    description: 'Character model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Character, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Character, {exclude: 'where'}) filter?: FilterExcludingWhere<Character>
  ): Promise<Character> {
    return this.characterRepository.findById(id, filter);
  }

  @get('/characters-for-user/{uid}')
  @response(200, {
    description: 'Array of Character model instance',

    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Character, {includeRelations: true}),
        },
      },
    },
  })
  async findByUid(
    @param.path.string('uid') uid: string,
  ): Promise<Character[]> {
    let listFlowwing: DetailUserFollow[] = await this.detailUserFollowRepository.find({where: {uid: uid}});
    // let listConected: DetailUserFollow[] = await this.detailUserFollowRepository.find({where: {uid: uid}});
    let resultList: Character[] = await this.characterRepository.find({where: {characterId: {nin: [...listFlowwing.map((e) => e.characterId)]}}});

    function shuffleArray<T>(array: T[]): T[] {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }

    return shuffleArray(resultList);
  }

  @patch('/characters/{id}')
  @response(204, {
    description: 'Character PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Character, {partial: true}),
        },
      },
    })
    character: Character,
  ): Promise<void> {
    await this.characterRepository.updateById(id, character);
  }

  @put('/characters/{id}')
  @response(204, {
    description: 'Character PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() character: Character,
  ): Promise<void> {
    await this.characterRepository.replaceById(id, character);
  }

  @del('/characters/{id}')
  @response(204, {
    description: 'Character DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.characterRepository.deleteById(id);
  }
}
