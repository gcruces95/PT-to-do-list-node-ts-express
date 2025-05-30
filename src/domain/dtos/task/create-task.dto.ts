export class CreateTaskDto {
  
  private constructor(
    public readonly titulo: string,
    public readonly descripcion?: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateTaskDto?] {
    const { titulo, descripcion } = props;

    // Validación de titulo
    if (!titulo) return ['titulo es requerido'];
    if (typeof titulo !== 'string') return ['titulo debe ser un string'];
    if (titulo.trim().length === 0) return ['titulo no puede estar vacío'];
    if (titulo.length > 100) return ['titulo no puede tener más de 100 caracteres'];

    // Validación de descripcion (opcional)
    if (descripcion !== undefined) {
      if (typeof descripcion !== 'string') return ['descripcion debe ser un string'];
      if (descripcion.length > 500) return ['descripcion no puede tener más de 500 caracteres'];
    }

    return [undefined, new CreateTaskDto(titulo.trim(), descripcion?.trim())];
  }
} 