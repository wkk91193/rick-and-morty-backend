// tests/integration/characterRoutes.test.ts
import request from 'supertest';
import express from 'express';
import characterRoutes from '../../routes/characterRoutes';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../../schemas/typeDefs';
import resolvers from '../../resolvers/characterResolver';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

beforeAll(async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.use('/api', characterRoutes);
});

describe('Character Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/characters', () => {
    it('should list characters with default parameters', async () => {
      const response = await request(app).get('/api/characters');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('results');
    });

    it('should list characters with sorting by name', async () => {
      const response = await request(app).get(
        '/api/characters?page=1&sort=name',
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('results');
      expect(response.body.results.length).toBeGreaterThan(0);
    });

    it('should list characters with species and status filters', async () => {
      const response = await request(app).get(
        '/api/characters?page=1&species=Human&status=Alive',
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('results');
      expect(response.body.results.length).toBeGreaterThan(0);
    });

    it('should handle invalid query parameters', async () => {
      const response = await request(app).get('/api/characters?page=abc');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should handle errors from the service layer', async () => {
      jest
        .spyOn(require('../../services/characterService'), 'getCharactersData')
        .mockImplementation(() => {
          throw new Error('Service error');
        });

      const response = await request(app).get('/api/characters?page=1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });

  describe('GET /api/characters/:id', () => {
    it('should fetch character by ID', async () => {
      const response = await request(app).get('/api/characters/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Rick Sanchez');
    });

    it('should handle invalid character ID', async () => {
      const response = await request(app).get('/api/characters/invalid-id');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should handle errors from the service layer', async () => {
      jest
        .spyOn(
          require('../../services/characterService'),
          'getCharacterDataById',
        )
        .mockImplementation(() => {
          throw new Error('Service error');
        });

      const response = await request(app).get('/api/characters/1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });
});
