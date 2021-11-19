import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Empleado, Proveedor, ProveedorEmpresa} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {ProveedorEmpresaRepository} from './proveedor-empresa.repository';
import {ProveedorRepository} from './proveedor.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empresa.prototype.id>;

  public readonly proveedors: HasManyThroughRepositoryFactory<Proveedor, typeof Proveedor.prototype.id,
          ProveedorEmpresa,
          typeof Empresa.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ProveedorEmpresaRepository') protected proveedorEmpresaRepositoryGetter: Getter<ProveedorEmpresaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Empresa, dataSource);
    this.proveedors = this.createHasManyThroughRepositoryFactoryFor('proveedors', proveedorRepositoryGetter, proveedorEmpresaRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
