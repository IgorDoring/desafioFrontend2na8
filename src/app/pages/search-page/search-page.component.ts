import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StarwarsService } from '../../service/starwars.service';
import { People, SearchResponse } from '../../model/people';
import {
  concatMap,
  defaultIfEmpty,
  endWith,
  finalize,
  forkJoin,
  from,
  map,
  Observable,
  of,
  scan,
  tap,
} from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, LoadingComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit{
  //todo pagina soh eh acessada ao digitar email
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });
  isLoading: boolean = false;
  hasError: boolean = false;
  search$: Observable<People | undefined> | undefined;
  resultado$: Observable<People> | undefined;
  personagem: People | undefined

  constructor(private swService: StarwarsService) {}

  ngOnInit(): void {
    let personagem = localStorage.getItem('personagem')
    console.log(personagem)
    if(personagem != null){
      this.search$ = of(JSON.parse(personagem))
      this.resultado$ = of(JSON.parse(personagem))
    }
  }

  pesquisarNovamente() {
    this.search$ = undefined;
    this.resultado$ = undefined;
    localStorage.removeItem('personagem')
  }

  onSubmit() {
    this.isLoading = true;
    this.search$ = this.swService
      .getCharacter(this.searchForm.value.search!)
      .pipe(
        map((res: SearchResponse) => {
          if (res.count != 1) {
            this.hasError = true;
            this.searchForm.setValue({ search: '' });
            this.isLoading = false;
            return;
          } else {
            this.resultado$ = forkJoin({
              name: of(res.results[0].name),
              homeworld: of(res.results[0].homeworld).pipe(
                concatMap((home) =>
                  this.swService
                    .getHomeworld(home)
                    .pipe(map((home) => home.name))
                ),
                defaultIfEmpty('No homeworld')
              ),
              films: from(res.results[0].films).pipe(
                concatMap((film) =>
                  this.swService.getFilm(film).pipe(map((film) => [film.title]))
                ),
                scan((all, curr) => [...all, ...curr]),
                defaultIfEmpty([])
              ),
              starships: from(res.results[0].starships).pipe(
                concatMap((starship) =>
                  this.swService
                    .getStarship(starship)
                    .pipe(map((starship) => [starship.name]))
                ),
                scan((all, curr) => [...all, ...curr]),
                defaultIfEmpty([])
              ),
              vehicles: from(res.results[0].vehicles).pipe(
                concatMap((vehicle) =>
                  this.swService
                    .getVehicle(vehicle)
                    .pipe(map((vehicle) => [vehicle.name]))
                ),
                scan((all, curr) => [...all, ...curr]),
                defaultIfEmpty([])
              ),
              species: from(res.results[0].species).pipe(
                concatMap((specie) =>
                  this.swService
                    .getSpecie(specie)
                    .pipe(map((specie) => [specie.name]))
                ),
                scan((all, curr) => [...all, ...curr]),
                defaultIfEmpty([])
              ),
            }).pipe(
              tap( personagem => localStorage.setItem('personagem', JSON.stringify(personagem))),
              finalize(() => {
                this.isLoading = false;
                this.hasError = false
              })
            );

            return res.results[0]!;
          }
        })
      );
  }
}
