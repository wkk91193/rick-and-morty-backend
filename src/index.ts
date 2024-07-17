import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs';
import resolvers from './resolvers/characterResolver';
import characterRoutes from './routes/characterRoutes';
import logger from '../logger';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';


const startServer = async () => {
  const port = 3000;
  const app = express();
  app.use(express.json());

  app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

  // GraphQL endpoint
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  // REST endpoints
  app.use('/api', characterRoutes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((err: any, req: any, res: any) => {
    logger.error(`Unhandled error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen({ port }, () =>
    logger.info(`Server ready at http://localhost:3000${server.graphqlPath}`)
  );
};

startServer().catch((error) => {
  logger.error(`Error starting server:${error}`);
});
