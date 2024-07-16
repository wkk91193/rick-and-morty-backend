import { IResolvers } from '@graphql-tools/utils';
import { getCharacters, getCharacterById } from '../services/characterService';

const resolvers: IResolvers = {
  Query: {
    characters: async (
      _: void,
      args: { page: number; pageSize: number; sort: string }
    ) => {
      const { page = 1, pageSize = 20, sort = '' } = args;
      try {
        return await getCharacters(page, pageSize, sort);
      } catch (error) {
        throw new Error(`Failed to fetch characters: ${error}`);
      }
    },
    character: async (_: void, args: { id: string }) => {
      try {
        return await getCharacterById(args.id);
      } catch (error) {
        throw new Error(`Failed to fetch character: ${error}`);
      }
    },
  },
};

export default resolvers;