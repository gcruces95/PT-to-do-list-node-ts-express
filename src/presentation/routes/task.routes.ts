import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { Server as SocketServer } from 'socket.io';

export class TaskRoutes {
  static get routes(): (io: SocketServer) => Router {
    return (io: SocketServer) => {
      const router = Router();
      const taskController = new TaskController(io);

      // POST /tasks - Crear una nueva tarea
      router.post('/', taskController.createTask);

      // GET /tasks - Obtener todas las tareas
      router.get('/', taskController.getAllTasks);

      // PUT /tasks/:id - Actualizar el estado de una tarea
      router.put('/:id', taskController.updateTask);

      // DELETE /tasks/:id - Eliminar una tarea
      router.delete('/:id', taskController.deleteTask);

      return router;
    };
  }
} 