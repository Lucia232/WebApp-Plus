import {Entity, model, property} from '@loopback/repository';

@model()
export class ProveedorEmpresa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  empresaId?: string;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  constructor(data?: Partial<ProveedorEmpresa>) {
    super(data);
  }
}

export interface ProveedorEmpresaRelations {
  // describe navigational properties here
}

export type ProveedorEmpresaWithRelations = ProveedorEmpresa & ProveedorEmpresaRelations;
