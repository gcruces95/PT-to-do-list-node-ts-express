export class UpdateTaskDto {
  
  private constructor(
    public readonly status: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, UpdateTaskDto?] {
    const { status } = props;

    // Validación de status
    if (!status) return ['status es requerido'];
    if (typeof status !== 'string') return ['status debe ser un string'];
    if (status.trim().length === 0) return ['status no puede estar vacío'];
    
    const validStatuses = ['pendiente', 'completada', 'en_progreso', 'cancelada'];
    if (!validStatuses.includes(status.trim().toLowerCase())) {
      return ['status debe ser uno de: ' + validStatuses.join(', ')];
    }

    return [undefined, new UpdateTaskDto(status.trim().toLowerCase())];
  }
} 