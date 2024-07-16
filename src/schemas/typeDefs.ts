import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    image: String
    status: String
    species: String
  }

  type CharactersResponse {
    results: [Character!]!
  }

  type Query {
    characters(page: Int, pageSize: Int, sort: String): CharactersResponse
    character(id: ID!): Character
  }
`;
