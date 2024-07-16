// src/services/characterService.ts

import axios from 'axios';

const RICK_AND_MORTY_API_URL = 'https://rickandmortyapi.com/graphql';

interface Character {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
}
interface CharactersResponse {
  results: Character[];
}

export const getCharacters = async (
  page: number,
  pageSize: number,
  sort: string
) => {
  try {
    const response = await axios.post(RICK_AND_MORTY_API_URL, {
      query: `
       query($page: Int!) {
        characters(page: $page) {
          results {
            id
            name
            image
            status
            species
          }
        }
      }
      `,
      variables: { page, pageSize },
    });

    const characters: CharactersResponse = response.data.data.characters;

    if (sort === 'name') {
      characters.results.sort((a: Character, b: Character) =>
        a.name.localeCompare(b.name)
      );
    } else if (sort === '-name') {
      characters.results.sort((a: Character, b: Character) =>
        b.name.localeCompare(a.name)
      );
    }
    return characters;
  } catch (error) {
    throw new Error('Failed to fetch characters from RickAndMorty API');
  }
};

export const getCharacterById = async (id: string): Promise<Character> => {
  try {
    const response = await axios.post(RICK_AND_MORTY_API_URL, {
      query: `
        query ($id: ID!) {
          character(id: $id) {
            id
            name
            image
            status
            species
          }
        }
      `,
      variables: { id },
    });

    return response.data.data.character;
  } catch (error) {
    throw new Error('Failed to fetch character from RickAndMorty API');
  }
};
