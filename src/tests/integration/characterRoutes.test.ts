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
  it('should list characters', async () => {
    const response = await request(app).get(
      '/api/characters?page=1&pageSize=20'
    );
    expect(response.status).toBe(200);
    expect(response.body.results.length).toBeGreaterThan(0);
  });

  it('should get character by ID', async () => {
    const response = await request(app).get('/api/characters/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
  });

  it('should list characters sorted by name', async () => {
    const response = await request(app).get(
      '/api/characters?page=1&pageSize=20&sort=name'
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('results');
    expect(response.body.results[0].name <= response.body.results[1].name).toBe(
      true
    );
  });

  it('should list characters sorted by name in descending order', async () => {
    const response = await request(app).get(
      '/api/characters?page=1&pageSize=20&sort=-name'
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('results');
    expect(response.body.results[0].name >= response.body.results[1].name).toBe(
      true
    );
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
    expect(response.body.error).toBe('Internal Server Error');
  });

  it('should handle errors from the getCharacterById service', async () => {
    jest
      .spyOn(require('../../services/characterService'), 'getCharacterById')
      .mockImplementation(() => {
        throw new Error('Service Error');
      });

    const response = await request(app).get('/api/characters/1');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });

  it('should handle unavailable character in the API', async () => {
    jest
      .spyOn(require('../../services/characterService'), 'getCharacterById')
      .mockImplementation(() => {
        throw new Error('Invalid character ID');
      });

    const response = await request(app).get('/api/characters/9999');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });

  it('should return 400 for invalid page parameter', async () => {
    const response = await request(app).get(
      '/api/characters?page=invalid&pageSize=20'
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'Page must be a positive integer'
    );
  });

  it('should return 400 for invalid pageSize parameter', async () => {
    const response = await request(app).get(
      '/api/characters?page=1&pageSize=invalid'
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toHaveProperty(
      'msg',
      'PageSize must be a positive integer'
    );
  });

    it('should handle invalid characterID', async () => {
      const response = await request(app).get(
        '/api/characters/invalid-character-id'
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0]).toHaveProperty(
        'msg',
        'ID must be a positive integer'
      );
    });
});
