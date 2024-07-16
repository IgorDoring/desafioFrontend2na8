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
import { map, Observable, tap } from 'rxjs';
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
  // search$: Observable<SearchResponse> | undefined;
  mensagem: string = '';

  personagemMock: People | undefined;

  constructor(private swService: StarwarsService) {}

  pesquisarNovamente() {
    this.personagemMock = undefined
  }

  onSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      this.personagemMock = {
        name: 'Darth Vader',
        films: [
          'A Ameaça Fantasma',
          'Ataque dos Clones',
          'A Vingança dos Sith',
          'O Retorno de Jedi',
        ],
        starships: ['TIE Advanced'],
        vehicles: [],
        species: [],
        homeworld: 'Tatooine',
      };
      this.isLoading = false;
    }, 2000);
  }
}
