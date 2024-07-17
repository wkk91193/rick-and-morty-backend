// tests/unit/characterService.test.ts

import {
  getCharactersData,
  getCharacterDataById,
} from '../../services/characterService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CharacterService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('getCharacters', () => {
    it('should fetch characters with default parameters', async () => {
      const charactersData = {
        characters: {
          info: {
            count: 826,
            pages: 42,
            next: 2,
            prev: null,
          },
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              image: 'image1',
              status: 'Alive',
              species: 'Human',
            },
            {
              id: '2',
              name: 'Morty Smith',
              image: 'image2',
              status: 'Alive',
              species: 'Human',
            },
          ],
        },
      };

      mockedAxios.post.mockResolvedValue({
        data: { data: charactersData },
      });
      const response = await getCharactersData();
      expect(charactersData.characters).toEqual(response);
    });

    it('should fetch characters with sorting by name', async () => {
      const charactersData = {
        characters: {
          info: {
            count: 826,
            pages: 42,
            next: 2,
            prev: null,
          },
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              image: 'image1',
              status: 'Alive',
              species: 'Human',
            },
            {
              id: '2',
              name: 'Morty Smith',
              image: 'image2',
              status: 'Alive',
              species: 'Human',
            },
          ],
        },
      };

      mockedAxios.post.mockResolvedValue({
        data: { data: charactersData },
      });

      const data = await getCharactersData(1, 'name');
      expect(data.results[0].name).toBe('Morty Smith');
      expect(data.results[1].name).toBe('Rick Sanchez');
    });
    it('should handle errors in fetching characters', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

      await expect(getCharactersData(1)).rejects.toThrow(
        'Failed to fetch characters from RickAndMorty API',
      );
    });
  });

  describe('getCharacterById', () => {
    it('should fetch character by ID', async () => {
      const characterData = {
        id: '1',
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        status: 'Alive',
        species: 'Human',
      };

      mockedAxios.post.mockResolvedValue({
        data: { data: { character: characterData } },
      });

      const data = await getCharacterDataById('1');
      expect(data).toEqual(characterData);
    });
    it('should handle errors in fetching a character by ID', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

      await expect(getCharacterDataById('1')).rejects.toThrow(
        'Failed to fetch character from RickAndMorty API',
      );
    });
  });
});
