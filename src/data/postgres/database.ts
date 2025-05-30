import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query'],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Conexión a PostgreSQL establecida correctamente');
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
}; 