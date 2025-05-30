import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../domain/errors/custom.errors';

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Si es un CustomError, usar su código y mensaje
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  // Para errores no controlados
  console.error('Error no controlado:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
}; 