import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs';
import resolvers from './resolvers/characterResolver';
import characterRoutes from './routes/characterRoutes';
import logger from '../logger';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import path from 'path';

const PORT = process.env.PORT || 4001;
const HOST = process.env.HOST || '0.0.0.0';

export const app = express();
app.use(express.json());
// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// REST endpoints
app.use('/api', characterRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// GraphQL endpoint
const server = new ApolloServer({ typeDefs, resolvers });
server
  .start()
  .then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: PORT, host: HOST }, () =>
      logger.info(`Server ready at ${HOST}:${PORT}${server.graphqlPath}`)
    );
  })
  .catch((error) => {
    logger.error(`Failed to start the server: ${error.message}`);
  });
