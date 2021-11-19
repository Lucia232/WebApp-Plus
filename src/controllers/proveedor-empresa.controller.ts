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
import {ProveedorEmpresa} from '../models';
import {ProveedorEmpresaRepository} from '../repositories';

export class ProveedorEmpresaController {
  constructor(
    @repository(ProveedorEmpresaRepository)
    public proveedorEmpresaRepository : ProveedorEmpresaRepository,
  ) {}

  @post('/proveedor-empresas')
  @response(200, {
    description: 'ProveedorEmpresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProveedorEmpresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorEmpresa, {
            title: 'NewProveedorEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    proveedorEmpresa: Omit<ProveedorEmpresa, 'id'>,
  ): Promise<ProveedorEmpresa> {
    return this.proveedorEmpresaRepository.create(proveedorEmpresa);
  }

  @get('/proveedor-empresas/count')
  @response(200, {
    description: 'ProveedorEmpresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProveedorEmpresa) where?: Where<ProveedorEmpresa>,
  ): Promise<Count> {
    return this.proveedorEmpresaRepository.count(where);
  }

  @get('/proveedor-empresas')
  @response(200, {
    description: 'Array of ProveedorEmpresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProveedorEmpresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProveedorEmpresa) filter?: Filter<ProveedorEmpresa>,
  ): Promise<ProveedorEmpresa[]> {
    return this.proveedorEmpresaRepository.find(filter);
  }

  @patch('/proveedor-empresas')
  @response(200, {
    description: 'ProveedorEmpresa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorEmpresa, {partial: true}),
        },
      },
    })
    proveedorEmpresa: ProveedorEmpresa,
    @param.where(ProveedorEmpresa) where?: Where<ProveedorEmpresa>,
  ): Promise<Count> {
    return this.proveedorEmpresaRepository.updateAll(proveedorEmpresa, where);
  }

  @get('/proveedor-empresas/{id}')
  @response(200, {
    description: 'ProveedorEmpresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProveedorEmpresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProveedorEmpresa, {exclude: 'where'}) filter?: FilterExcludingWhere<ProveedorEmpresa>
  ): Promise<ProveedorEmpresa> {
    return this.proveedorEmpresaRepository.findById(id, filter);
  }

  @patch('/proveedor-empresas/{id}')
  @response(204, {
    description: 'ProveedorEmpresa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorEmpresa, {partial: true}),
        },
      },
    })
    proveedorEmpresa: ProveedorEmpresa,
  ): Promise<void> {
    await this.proveedorEmpresaRepository.updateById(id, proveedorEmpresa);
  }

  @put('/proveedor-empresas/{id}')
  @response(204, {
    description: 'ProveedorEmpresa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proveedorEmpresa: ProveedorEmpresa,
  ): Promise<void> {
    await this.proveedorEmpresaRepository.replaceById(id, proveedorEmpresa);
  }

  @del('/proveedor-empresas/{id}')
  @response(204, {
    description: 'ProveedorEmpresa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proveedorEmpresaRepository.deleteById(id);
  }
}
