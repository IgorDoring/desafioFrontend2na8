import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concat, concatMap, from, map, Observable, of, pluck, tap } from 'rxjs';
import { People, SearchResponse } from '../model/people';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  readonly url = 'https://swapi.dev/api/';
  http: HttpClient = inject(HttpClient);

  constructor() {}

  getCharacter(char: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(this.url + 'people/?search=' + char);
  }

  getFilm(film: string): Observable<{title:string}> {
    return this.http.get<{title:string}>(film)
  }

  getStarship(starship: string): Observable<{name:string}> {
    return this.http.get<{name:string}>(starship)
  }

  getVehicle(vehicles: string): Observable<{name:string}> {
    return this.http.get<{name:string}>(vehicles)
  }

  getHomeworld(homeworld: string): Observable<{name:string}> {
    return this.http.get<{name:string}>(homeworld)
  }

  getSpecie(specie: string): Observable<{name: string}>{
    return this.http.get<{name:string}>(specie)
  }
}
