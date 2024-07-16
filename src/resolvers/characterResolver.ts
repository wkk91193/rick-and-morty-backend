import { IResolvers } from '@graphql-tools/utils';
import { getCharacters, getCharacterById } from '../services/characterService';
import logger from '../../logger';

const resolvers: IResolvers = {
  Query: {
    characters: async (
      _: void,
      args: {
        page: number;
        sort: string;
        species: string;
        status: string;
      }
    ) => {
      const { page = 1, sort = '', species = '', status = '' } = args;
      try {
        return await getCharacters(page, sort, species, status);
      } catch (error) {
        logger.error(`Failed to fetch characters: ${error}`);
        throw new Error(`Failed to fetch characters: ${error}`);
      }
    },
    character: async (_: void, args: { id: string }) => {
      try {
        return await getCharacterById(args.id);
      } catch (error) {
        logger.error(`Failed to fetch character with ID ${args.id}: ${error}`);
        throw new Error(`Failed to fetch character: ${error}`);
      }
    },
  },
};

export default resolvers;
