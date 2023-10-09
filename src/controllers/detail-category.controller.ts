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
import {DetailCategory, DetailCategoryParam} from '../models';
import {DetailCategoryRepository} from '../repositories';

export class DetailCategoryController {
  constructor(
    @repository(DetailCategoryRepository)
    public detailCategoryRepository: DetailCategoryRepository,
  ) { }

  @post('/detail-categories')
  @response(200, {
    description: 'DetailCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetailCategoryParam)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailCategoryParam, {
            title: 'NewDetailCategory',
            // exclude: ['detailCategoryId'],
          }),
        },
      },
    })
    detailCategory: Omit<DetailCategoryParam, 'id'>,
  ): Promise<boolean> {
    let categoriesLength: number = detailCategory.categories.length;
    for (let i: number = 0; i < categoriesLength; i++) {
      let newData: DetailCategory = new DetailCategory();
      newData.categoryId = detailCategory.categories[i];
      newData.uid = detailCategory.uid;
      this.detailCategoryRepository.create(newData)
    }
    return true;
  }

  @get('/detail-categories/count')
  @response(200, {
    description: 'DetailCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetailCategory) where?: Where<DetailCategory>,
  ): Promise<Count> {
    return this.detailCategoryRepository.count(where);
  }

  @get('/detail-categories')
  @response(200, {
    description: 'Array of DetailCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetailCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetailCategory) filter?: Filter<DetailCategory>,
  ): Promise<DetailCategory[]> {
    return this.detailCategoryRepository.find(filter);
  }

  @patch('/detail-categories')
  @response(200, {
    description: 'DetailCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailCategory, {partial: true}),
        },
      },
    })
    detailCategory: DetailCategory,
    @param.where(DetailCategory) where?: Where<DetailCategory>,
  ): Promise<Count> {
    return this.detailCategoryRepository.updateAll(detailCategory, where);
  }

  @get('/detail-categories/{id}')
  @response(200, {
    description: 'DetailCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetailCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetailCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<DetailCategory>
  ): Promise<DetailCategory> {
    return this.detailCategoryRepository.findById(id, filter);
  }

  @patch('/detail-categories/{id}')
  @response(204, {
    description: 'DetailCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetailCategory, {partial: true}),
        },
      },
    })
    detailCategory: DetailCategory,
  ): Promise<void> {
    await this.detailCategoryRepository.updateById(id, detailCategory);
  }

  @put('/detail-categories/{id}')
  @response(204, {
    description: 'DetailCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detailCategory: DetailCategory,
  ): Promise<void> {
    await this.detailCategoryRepository.replaceById(id, detailCategory);
  }

  @del('/detail-categories/{id}')
  @response(204, {
    description: 'DetailCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detailCategoryRepository.deleteById(id);
  }
}
