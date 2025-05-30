import { TaskEntity } from '../../entities/task.entity';

export interface GetTasksUseCase {
  execute(): Promise<TaskEntity[]>;
}

export class GetTasks implements GetTasksUseCase {
  
  constructor(
    private readonly repository: GetTasksRepository,
  ) {}

  async execute(): Promise<TaskEntity[]> {
    return await this.repository.findAll();
  }
}

export abstract class GetTasksRepository {
  abstract findAll(): Promise<TaskEntity[]>;
} 