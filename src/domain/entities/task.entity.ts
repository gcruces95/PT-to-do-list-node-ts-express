import { CustomError } from '../errors/custom.errors';

export class TaskEntity {
  constructor(
    public readonly id: string,
    public readonly titulo: string,
    public readonly descripcion: string | null,
    public readonly status: string,
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
  ) {}

  public static fromObject(object: { [key: string]: any }): TaskEntity {
    const { id, titulo, descripcion, status, fechaCreacion, fechaActualizacion } = object;
    
    if (!id) throw CustomError.badRequest('id es requerido');
    if (!titulo) throw CustomError.badRequest('titulo es requerido');
    if (!status) throw CustomError.badRequest('status es requerido');
    if (!fechaCreacion) throw CustomError.badRequest('fechaCreacion es requerido');
    if (!fechaActualizacion) throw CustomError.badRequest('fechaActualizacion es requerido');

    return new TaskEntity(
      id,
      titulo,
      descripcion,
      status,
      new Date(fechaCreacion),
      new Date(fechaActualizacion)
    );
  }
} 