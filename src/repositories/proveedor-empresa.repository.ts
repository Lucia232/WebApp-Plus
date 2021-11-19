import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProveedorEmpresa, ProveedorEmpresaRelations} from '../models';

export class ProveedorEmpresaRepository extends DefaultCrudRepository<
  ProveedorEmpresa,
  typeof ProveedorEmpresa.prototype.id,
  ProveedorEmpresaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProveedorEmpresa, dataSource);
  }
}
