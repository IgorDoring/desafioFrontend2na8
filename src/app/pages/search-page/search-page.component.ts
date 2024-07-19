import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  finalize,
  forkJoin,
  from,
  map,
  Observable,
  of,
  scan,
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
export class SearchPageComponent {
  //todo pagina soh eh acessada ao digitar email
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });
  isLoading: boolean = false;
  erro: boolean = false;
  search$: Observable<People | undefined> | undefined;
  resultado$: Observable<People> | undefined;
  mensagem: string = '';

  constructor(private swService: StarwarsService) {}

  pesquisarNovamente() {
    this.search$ = undefined
    this.resultado$ = undefined
  }

  onSubmit() {
    this.isLoading = true;
    this.search$ = this.swService.getCharacter('Darth Vader').pipe(
      map((res: SearchResponse) => {
        console.log(res);
        if (res.count != 1) {
          this.erro = true;
          this.searchForm.setValue({ search: '' });
          this.isLoading = false;
          return;
        } else {
          this.resultado$ = forkJoin({
            name: of(res.results[0].name),
            homeworld: of(res.results[0].homeworld).pipe(
              concatMap((home) =>
                this.swService.getHomeworld(home).pipe(map((home) => home.name))
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
          })
          .pipe(
            finalize(() => {console.log("end");this.isLoading = false})
          );

          return res.results[0]!;
        }
      })
    );
  }
}
