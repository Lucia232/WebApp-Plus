import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Proveedor} from './proveedor.model';
import {ProveedorEmpresa} from './proveedor-empresa.model';

@model()
export class Empresa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  razonsocial: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Proveedor, {through: {model: () => ProveedorEmpresa}})
  proveedors: Proveedor[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
