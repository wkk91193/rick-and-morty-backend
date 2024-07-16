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
  page: number = 1,
  sort: string = '',
  species: string = '',
  status: string = ''
) => {
  try {
    const query = `
            query ($page: Int, $species: String, $status: String) {
              characters(page: $page, filter: { species: $species, status: $status }) {
                results {
                  id
                  name
                  image
                  status
                  species
                }
              }
            }
          `;
    const response = await axios.post(RICK_AND_MORTY_API_URL, {
      query,
      variables: { page, species, status },
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
    const query = `
        query ($id: ID!) {
          character(id: $id) {
            id
            name
            image
            status
            species
          }
        }
      `;
    const response = await axios.post(RICK_AND_MORTY_API_URL, {
      query,
      variables: { id },
    });

    return response.data.data.character;
  } catch (error) {
    throw new Error('Failed to fetch character from RickAndMorty API');
  }
};
