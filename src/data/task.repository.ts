import { prisma } from './postgres/database';
import { TaskEntity, CreateTaskDto, UpdateTaskDto } from '../domain';
import { CustomError } from '../domain/errors/custom.errors';

export class TaskRepository {

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const task = await prisma.task.create({
        data: {
          titulo: createTaskDto.titulo,
          descripcion: createTaskDto.descripcion || null,
        },
      });

      return TaskEntity.fromObject(task);
    } catch (error) {
      console.error('Error creating task in database:', error);
      throw CustomError.internalServer('Error al crear la tarea en la base de datos');
    }
  }

  async findAll(): Promise<TaskEntity[]> {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: {
          fechaCreacion: 'desc',
        },
      });

      return tasks.map((task: any) => TaskEntity.fromObject(task));
    } catch (error) {
      console.error('Error getting tasks from database:', error);
      throw CustomError.internalServer('Error al obtener las tareas de la base de datos');
    }
  }

  async findById(id: string): Promise<TaskEntity | null> {
    try {
      const task = await prisma.task.findUnique({
        where: { id },
      });

      return task ? TaskEntity.fromObject(task) : null;
    } catch (error) {
      console.error('Error getting task by id from database:', error);
      throw CustomError.internalServer('Error al obtener la tarea de la base de datos');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity | null> {
    try {
      // Primero verificamos si la tarea existe
      const existingTask = await this.findById(id);
      if (!existingTask) {
        return null;
      }

      const task = await prisma.task.update({
        where: { id },
        data: {
          status: updateTaskDto.status,
        },
      });

      return TaskEntity.fromObject(task);
    } catch (error) {
      console.error('Error updating task in database:', error);
      throw CustomError.internalServer('Error al actualizar la tarea en la base de datos');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      // Primero verificamos si la tarea existe
      const existingTask = await this.findById(id);
      if (!existingTask) {
        return false;
      }

      await prisma.task.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      console.error('Error deleting task from database:', error);
      throw CustomError.internalServer('Error al eliminar la tarea de la base de datos');
    }
  }
} 