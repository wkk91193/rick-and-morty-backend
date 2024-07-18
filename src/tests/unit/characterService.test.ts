// tests/unit/characterService.test.ts

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getCharactersData,
  getCharacterDataById,
} from '../../services/characterService';

describe('CharacterService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.restore();
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
      mock.onPost().reply(200, {
        data: charactersData,
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

      mock.onPost().reply(200, {
        data: charactersData,
      });

      const data = await getCharactersData(1, 'name');
      expect(data.results[0].name).toBe('Morty Smith');
      expect(data.results[1].name).toBe('Rick Sanchez');
    });
    it('should handle errors in fetching characters', async () => {
      mock.onPost().reply(500);

      await expect(getCharactersData(1)).rejects.toThrow(
        'Failed to fetch characters from RickAndMorty API'
      );
    });
  });

  describe('getCharacterById', () => {
    it('should fetch character by ID', async () => {
      const characterData = {
        character: {
          id: '1',
          name: 'Rick Sanchez',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          status: 'Alive',
          species: 'Human',
          location: {
            name: 'Citadel of Ricks',
          },
          episode: [
            {
              id: '1',
              name: 'Pilot',
              episode: 'S01E01',
              air_date: 'December 2, 2013',
            },
            {
              id: '2',
              name: 'Lawnmower Dog',
              episode: 'S01E02',
              air_date: 'December 9, 2013',
            },
          ],
        },
      };
      mock.onPost().reply(200, {
        data: characterData,
      });
      const data = await getCharacterDataById('1');
      expect(data).toEqual(characterData.character);
    });
    it('should handle errors in fetching a character by ID', async () => {
      mock.onPost().reply(500);
      await expect(getCharacterDataById('1')).rejects.toThrow(
        'Failed to fetch character from RickAndMorty API'
      );
    });
  });
});
