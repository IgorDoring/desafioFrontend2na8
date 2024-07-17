import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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

  getFilm(film: string): any{
    return this.http.get<any>(film);

  }
}
