import { CreateTaskDto } from '../../dtos';
import { TaskEntity } from '../../entities/task.entity';

export interface CreateTaskUseCase {
  execute(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
}

export class CreateTask implements CreateTaskUseCase {
  
  constructor(
    private readonly repository: CreateTaskRepository,
  ) {}

  async execute(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.repository.create(createTaskDto);
  }
}

export abstract class CreateTaskRepository {
  abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
} 