import request from 'supertest';
import express from 'express';
import characterRoutes from '../../routes/characterRoutes';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../../schemas/typeDefs';
import { resolvers } from '../../resolvers/characterResolver';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

beforeAll(async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.use('/api', characterRoutes);
});

describe('Character Routes', () => {
  it('should list characters', async () => {
    const response = await request(app).get(
      '/api/characters?page=1&pageSize=20'
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get character by ID', async () => {
    const response = await request(app).get('/api/characters/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
  });
  it('should handle errors from the getCharacters service', async () => {
    jest
      .spyOn(require('../../services/characterService'), 'getCharacters')
      .mockImplementation(() => {
        throw new Error('Service error');
      });

    const response = await request(app).get(
      '/api/characters?page=1&pageSize=20'
    );
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to fetch characters');
  });

  it('should handle errors from the getCharacterById service', async () => {
    jest
      .spyOn(require('../../services/characterService'), 'getCharacterById')
      .mockImplementation(() => {
        throw new Error('Service error');
      });

    const response = await request(app).get('/api/characters/1');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to fetch character');
  });

  it('should handle invalid character ID', async () => {
    jest
      .spyOn(require('../../services/characterService'), 'getCharacterById')
      .mockImplementation(() => {
        throw new Error('Invalid character ID');
      });

    const response = await request(app).get('/api/characters/9999');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to fetch character');
  });
});
