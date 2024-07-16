import { IResolvers } from '@graphql-tools/utils';
import { getCharacters, getCharacterById } from '../services/characterService';

export const resolvers: IResolvers = {
  Query: {
    characters: async (_: any, { page = 1, pageSize = 20 }: { page: number, pageSize: number }) => {
      return await getCharacters(page, pageSize);
    },
    character: async (_: any, { id }: { id: string }) => {
      return await getCharacterById(id);
    }
  }
};
