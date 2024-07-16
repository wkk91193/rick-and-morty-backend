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

    const result = await getCharacters(1, 20);
    expect(result).toEqual([
        { id: '1', name: 'Rick Sanchez', image: '', status: '', species: '' },
      ]);
  });
  it('should handle errors in fetching characters', async () => {
     mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

     await expect(getCharacters(1, 20)).rejects.toThrow('Network Error');
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

    const result = await getCharacterById('1');
    expect(result).toEqual({
      id: '1',
      name: 'Rick Sanchez',
      image: '',
      status: '',
      species: '',
    });
  });

  it('should handle errors in fetching a character by ID', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getCharacterById('1')).rejects.toThrow('Network Error');
  });
});
