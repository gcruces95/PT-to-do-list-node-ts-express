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
    
    if (!id) throw new Error('id es requerido');
    if (!titulo) throw new Error('titulo es requerido');
    if (!status) throw new Error('status es requerido');
    if (!fechaCreacion) throw new Error('fechaCreacion es requerido');
    if (!fechaActualizacion) throw new Error('fechaActualizacion es requerido');

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