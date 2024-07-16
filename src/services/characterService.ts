import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/graphql';

export const getCharacters = async (page: number, pageSize: number) => {
  const query = `
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
  `;

  const response = await axios.post(API_URL, {
    query,
    variables: { page },
  });

  return response.data.data.characters.results;
};

export const getCharacterById = async (id: string) => {
  const query = `
    query($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        species
      }
    }
  `;

  const response = await axios.post(API_URL, {
    query,
    variables: { id },
  });

  return response.data.data.character;
};
