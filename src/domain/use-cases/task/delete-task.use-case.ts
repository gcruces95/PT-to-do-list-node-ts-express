export interface DeleteTaskUseCase {
  execute(id: string): Promise<boolean>;
}

export class DeleteTask implements DeleteTaskUseCase {
  
  constructor(
    private readonly repository: DeleteTaskRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

export abstract class DeleteTaskRepository {
  abstract delete(id: string): Promise<boolean>;
} 