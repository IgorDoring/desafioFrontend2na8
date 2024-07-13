export interface PeopleResponse {
  count: number;
  next: string;
  previous: string;
  results: People[];
}

export interface People {
  readonly name: string
  readonly films: { title: string }[];
  readonly starships: { name: string }[];
  readonly vehicles: { name: string }[];
  readonly species: { name: string }[];
  readonly homeworld: string;
}
