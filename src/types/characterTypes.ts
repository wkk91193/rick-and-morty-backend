export interface Character {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
}
export interface CharactersResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
}
interface Location {
  name: string;
}
interface Origin {
  name: string;
}
interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}
export interface CharacterDetail extends Character {
  origin: Origin;
  location: Location;
  episode: Episode;
}
