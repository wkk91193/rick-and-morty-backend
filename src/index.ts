import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './resolvers/characterResolver';
import characterRoutes from './routes/characterRoutes';

const startServer = async () => {
  const app = express();

  // GraphQL endpoint
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  // REST endpoints
  app.use('/api', characterRoutes);

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
