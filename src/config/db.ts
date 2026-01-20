import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // Example for Postgres
import pg from 'pg'; // Need the peer dependency

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });

const prismaClientSingleton = () => {
  // Pass the adapter instance to the constructor
  return new PrismaClient({ adapter: new PrismaPg(pool) });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
