import { Request, Response } from 'express';
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

  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const [error, createTaskDto] = CreateTaskDto.create(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: error,
        });
        return;
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
      console.error('Error creating task:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  };

  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.getTasksUseCase.execute();

      res.status(200).json({
        success: true,
        data: tasks,
        message: 'Tareas obtenidas exitosamente',
      });
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const [error, updateTaskDto] = UpdateTaskDto.create(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: error,
        });
        return;
      }

      const updatedTask = await this.updateTaskUseCase.execute(id, updateTaskDto!);

      if (!updatedTask) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
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
      console.error('Error updating task:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const deleted = await this.deleteTaskUseCase.execute(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
      }

      // Aqui se emite el evento de tarea eliminada
      this.io.emit('taskDeleted', { id });

      res.status(200).json({
        success: true,
        message: 'Tarea eliminada exitosamente',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  };
} 