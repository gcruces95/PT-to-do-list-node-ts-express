import { Request, Response, NextFunction } from 'express';
import { Server as SocketServer } from 'socket.io';
import { 
  CreateTaskDto, 
  UpdateTaskDto,
  CreateTask,
  GetTasks,
  UpdateTask,
  DeleteTask
} from '../../domain';
import { TaskRepository } from '../../data/task.repository';
import { CustomError } from '../../domain/errors/custom.errors';

export class TaskController {
  private createTaskUseCase: CreateTask;
  private getTasksUseCase: GetTasks;
  private updateTaskUseCase: UpdateTask;
  private deleteTaskUseCase: DeleteTask;
  private io: SocketServer;

  constructor(io: SocketServer) {
    const taskRepository = new TaskRepository();
    this.createTaskUseCase = new CreateTask(taskRepository);
    this.getTasksUseCase = new GetTasks(taskRepository);
    this.updateTaskUseCase = new UpdateTask(taskRepository);
    this.deleteTaskUseCase = new DeleteTask(taskRepository);
    this.io = io;
  }

  createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const [error, createTaskDto] = CreateTaskDto.create(req.body);

      if (error) {
        throw CustomError.badRequest(error);
      }

      const newTask = await this.createTaskUseCase.execute(createTaskDto!);

      // Aqui se emite el evento de nuevo tarea
      this.io.emit('newTask', newTask);

      res.status(201).json({
        success: true,
        data: newTask,
        message: 'Tarea creada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = await this.getTasksUseCase.execute();

      res.status(200).json({
        success: true,
        data: tasks,
        message: 'Tareas obtenidas exitosamente',
      });
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea proporcionado
      if (!id || id.trim() === '') {
        throw CustomError.badRequest('ID de tarea es requerido');
      }

      const [error, updateTaskDto] = UpdateTaskDto.create(req.body);

      if (error) {
        throw CustomError.badRequest(error);
      }

      const updatedTask = await this.updateTaskUseCase.execute(id, updateTaskDto!);

      if (!updatedTask) {
        throw CustomError.notFound('Tarea no encontrada');
      }

      // Aqui se emite el evento de tarea actualizada
      this.io.emit('taskUpdated', {
        id: updatedTask.id,
        status: updatedTask.status,
        fechaActualizacion: updatedTask.fechaActualizacion,
      });

      res.status(200).json({
        success: true,
        data: updatedTask,
        message: 'Tarea actualizada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      // Validar que el ID sea proporcionado
      if (!id || id.trim() === '') {
        throw CustomError.badRequest('ID de tarea es requerido');
      }

      const deleted = await this.deleteTaskUseCase.execute(id);

      if (!deleted) {
        throw CustomError.notFound('Tarea no encontrada');
      }

      // Aqui se emite el evento de tarea eliminada
      this.io.emit('taskDeleted', { id });

      res.status(200).json({
        success: true,
        message: 'Tarea eliminada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  };
} 