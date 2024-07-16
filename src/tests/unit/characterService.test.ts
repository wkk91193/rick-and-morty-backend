// tests/unit/characterService.test.ts

import {
  getCharacters,
  getCharacterById,
} from '../../services/characterService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Character Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch characters', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          characters: {
            results: [
              {
                id: '1',
                name: 'Rick Sanchez',
                image: '',
                status: '',
                species: '',
              },
            ],
          },
        },
      },
    });

    const characters = await getCharacters(1, 20, '');
    expect(characters.results).toEqual([
      { id: '1', name: 'Rick Sanchez', image: '', status: '', species: '' },
    ]);
  });

  it('should fetch a character by ID', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          character: {
            id: '1',
            name: 'Rick Sanchez',
            image: '',
            status: '',
            species: '',
          },
        },
      },
    });

    const character = await getCharacterById('1');
    expect(character).toEqual({
      id: '1',
      name: 'Rick Sanchez',
      image: '',
      status: '',
      species: '',
    });
  });

  it('should handle errors in fetching characters', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getCharacters(1, 20, '')).rejects.toThrow(
      'Failed to fetch characters from RickAndMorty API'
    );
  });

  it('should handle errors in fetching a character by ID', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getCharacterById('1')).rejects.toThrow(
      'Failed to fetch character from RickAndMorty API'
    );
  });
});
