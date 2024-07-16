import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    image: String
    status: String
    species: String
  }

  type Query {
    characters(page: Int, pageSize: Int): [Character]
    character(id: ID!): Character
  }
`;
