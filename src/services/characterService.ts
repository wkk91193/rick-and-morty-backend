import axios from 'axios';
import logger from '../../logger';

import {
  Character,
  CharacterDetail,
  CharactersResponse,
} from '../types/characterTypes';

const RICK_AND_MORTY_API_URL =
  process.env.RICK_AND_MORTY_API_URL || 'https://rickandmortyapi.com/graphql';
export const getCharactersData = async (
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
                info {
                  count
                  pages
                  next
                  prev
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
    logger.error(`Failed to fetch characters: ${error}`);
    throw new Error('Failed to fetch characters from RickAndMorty API');
  }
};

export const getCharacterDataById = async (id: string): Promise<Character> => {
  try {
    const query = `
        query ($id: ID!) {
           character(id: $id) {
              id
              name
              image
              status
              species
              origin {
                name
              }
              location {
                name
              }
              episode {
                id
                name
                episode
                air_date
              }
            }
         }
      `;
    const response = await axios.post(RICK_AND_MORTY_API_URL, {
      query,
      variables: { id },
    });
    const characterDetail: CharacterDetail = response.data.data.character;
    return characterDetail;
  } catch (error) {
    logger.error(`Failed to fetch character with ID ${id}: ${error}`);
    throw new Error('Failed to fetch character from RickAndMorty API');
  }
};
