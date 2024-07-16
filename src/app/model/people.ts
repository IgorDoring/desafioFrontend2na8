export interface SearchResponse {
  readonly count: number;
  readonly next: string;
  readonly previous: string;
  readonly results: People[];
}

export interface People {
  name: string
  films: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  homeworld: string;
}
