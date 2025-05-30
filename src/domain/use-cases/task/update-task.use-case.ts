import { UpdateTaskDto } from '../../dtos';
import { TaskEntity } from '../../entities/task.entity';

export interface UpdateTaskUseCase {
  execute(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity | null>;
}

export class UpdateTask implements UpdateTaskUseCase {
  
  constructor(
    private readonly repository: UpdateTaskRepository,
  ) {}

  async execute(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity | null> {
    return await this.repository.update(id, updateTaskDto);
  }
}

export abstract class UpdateTaskRepository {
  abstract update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity | null>;
} 