import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configuración de WebSocket para Neon DB
neonConfig.webSocketConstructor = ws;

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Validar variables de entorno
const requiredEnvVars = ['NODE_ENV', 'DATABASE_URL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
}

const isProduction = process.env.NODE_ENV === 'production';

// Crear el cliente de Prisma con la configuración adecuada según el entorno
const createPrismaClient = (): PrismaClient => {
  try {
    if (isProduction) {
      // Configuración para producción (Neon DB)
      const connectionString = process.env.DATABASE_URL;
      
      if (!connectionString) {
        throw new Error('❌ DATABASE_URL is required in production environment');
      }

      const pool = new Pool({ connectionString });
      const adapter = new PrismaNeon(pool);
      
      console.log('🔌 Using Neon DB in production mode');
      return new PrismaClient({
        adapter,
        log: ['error', 'warn'],
      });
    } else {
      // Configuración para desarrollo (local)
      console.log('💻 Using local database in development mode');
      return new PrismaClient({
        log: [
          { level: 'query', emit: 'event' },
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ],
      });
    }
  } catch (error) {
    console.error('❌ Error creating Prisma client:', error);
    throw error;
  }
};

// Implementación del patrón singleton
let prisma: PrismaClient;

if (isProduction) {
  prisma = createPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = createPrismaClient();
  }
  prisma = global.prisma;

  // Manejo de cierre en desarrollo
  process.on('beforeExit', async () => {
    if (global.prisma) {
      await global.prisma.$disconnect();
    }
  });
}

export default prisma;