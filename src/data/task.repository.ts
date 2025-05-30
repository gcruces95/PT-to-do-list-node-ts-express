import { prisma } from './postgres/database';
import { TaskEntity, CreateTaskDto, UpdateTaskDto } from '../domain';

export class TaskRepository {

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = await prisma.task.create({
      data: {
        titulo: createTaskDto.titulo,
        descripcion: createTaskDto.descripcion || null,
      },
    });

    return TaskEntity.fromObject(task);
  }

  async findAll(): Promise<TaskEntity[]> {
    const tasks = await prisma.task.findMany({
      orderBy: {
        fechaCreacion: 'desc',
      },
    });

    return tasks.map((task: any) => TaskEntity.fromObject(task));
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    return task ? TaskEntity.fromObject(task) : null;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity | null> {
    try {
      const task = await prisma.task.update({
        where: { id },
        data: {
          status: updateTaskDto.status,
        },
      });

      return TaskEntity.fromObject(task);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.task.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
} 