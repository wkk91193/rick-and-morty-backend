import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    image: String!
    status: String!
    species: String!
  }
  type Info {
    count: Int
    pages: Int
    next: Int
    prev: Int
  }

  type CharactersResponse {
    results: [Character!]!
    info: Info
  }

  type CharacterDetail {
    id: ID!
    name: String!
    image: String!
    status: String!
    species: String!
    origin: Origin!
    location: Location!
    episode: Episode!
  }

  type Origin {
    name: String!
  }

  type Location {
    name: String!
  }
  type Episode {
    id: String!
    name: String!
    episode: String!
    air_date: String!
  }
  type Query {
    characters(
      page: Int
      sort: String
      species: String
      status: String
    ): CharactersResponse
    character(id: ID!): CharacterDetail
  }
`;
