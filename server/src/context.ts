import { PrismaClient } from '@prisma/client';
import { getUserIdFromToken } from './auth/auth.utils';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
}

export const createContext = async ({ req }: ExpressContextFunctionArgument): Promise<Context> => {
  const authHeader = req.headers.authorization || '';
  
  let userId: string | null = null;
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    userId = getUserIdFromToken(token);
  }

  return {
    prisma,
    userId,
  };
};