import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { schema } from './schema';
import { createContext } from './context';

dotenv.config();

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: createContext,
    }),
  );

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}/shareeat-server`);
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});