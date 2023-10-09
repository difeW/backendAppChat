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
import {DetailCharacterCategory} from '../models';
import {DetailCharacterCategoryRepository} from '../repositories';

export class DetailCharacterCategoryController {
  constructor(
    @repository(DetailCharacterCategoryRepository)
    public detailCharacterCategoryRepository : DetailCharacterCategoryRepository,
  ) {}

  @post('/detail-character-categories')
  @response(200, {
    description: 'DetailCharacterCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetailCharacterCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailCharacterCategory, {
            title: 'NewDetailCharacterCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    detailCharacterCategory: Omit<DetailCharacterCategory, 'id'>,
  ): Promise<DetailCharacterCategory> {
    return this.detailCharacterCategoryRepository.create(detailCharacterCategory);
  }

  @get('/detail-character-categories/count')
  @response(200, {
    description: 'DetailCharacterCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetailCharacterCategory) where?: Where<DetailCharacterCategory>,
  ): Promise<Count> {
    return this.detailCharacterCategoryRepository.count(where);
  }

  @get('/detail-character-categories')
  @response(200, {
    description: 'Array of DetailCharacterCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetailCharacterCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetailCharacterCategory) filter?: Filter<DetailCharacterCategory>,
  ): Promise<DetailCharacterCategory[]> {
    return this.detailCharacterCategoryRepository.find(filter);
  }

  @patch('/detail-character-categories')
  @response(200, {
    description: 'DetailCharacterCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailCharacterCategory, {partial: true}),
        },
      },
    })
    detailCharacterCategory: DetailCharacterCategory,
    @param.where(DetailCharacterCategory) where?: Where<DetailCharacterCategory>,
  ): Promise<Count> {
    return this.detailCharacterCategoryRepository.updateAll(detailCharacterCategory, where);
  }

  @get('/detail-character-categories/{id}')
  @response(200, {
    description: 'DetailCharacterCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetailCharacterCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetailCharacterCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<DetailCharacterCategory>
  ): Promise<DetailCharacterCategory> {
    return this.detailCharacterCategoryRepository.findById(id, filter);
  }

  @patch('/detail-character-categories/{id}')
  @response(204, {
    description: 'DetailCharacterCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailCharacterCategory, {partial: true}),
        },
      },
    })
    detailCharacterCategory: DetailCharacterCategory,
  ): Promise<void> {
    await this.detailCharacterCategoryRepository.updateById(id, detailCharacterCategory);
  }

  @put('/detail-character-categories/{id}')
  @response(204, {
    description: 'DetailCharacterCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detailCharacterCategory: DetailCharacterCategory,
  ): Promise<void> {
    await this.detailCharacterCategoryRepository.replaceById(id, detailCharacterCategory);
  }

  @del('/detail-character-categories/{id}')
  @response(204, {
    description: 'DetailCharacterCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detailCharacterCategoryRepository.deleteById(id);
  }
}
