import { Router } from 'express';
import { TaskRoutes } from './routes/task.routes';
import { Server as SocketServer } from 'socket.io';

export class AppRoutes {
  static get routes(): (io: SocketServer) => Router {
    return (io: SocketServer) => {
      const router = Router();

      // Ruta de health check
      router.get('/health', (req, res) => {
        res.json({
          success: true,
          message: 'API funcionando correctamente',
          timestamp: new Date().toISOString(),
        });
      });

      // Rutas de tareas
      router.use('/tasks', TaskRoutes.routes(io));

      return router;
    };
  }
}