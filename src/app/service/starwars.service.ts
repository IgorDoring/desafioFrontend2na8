import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { People, PeopleResponse } from '../model/people';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  readonly url = 'https://swapi.dev/api/people/?search=';
  http: HttpClient = inject(HttpClient);

  constructor() {}

  getCharacter(char: string): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(this.url + char);
  }
}
