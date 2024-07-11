import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StarwarsService } from '../../service/starwars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  //todo pagina soh eh acessar ao digitar email
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });
  erro: boolean = false
  mensagem: string = ""

  constructor(private swService: StarwarsService, private router: Router) {}

  onSubmit() {
    if (this.searchForm.valid) {
      let character = this.searchForm.controls.search.value
      this.swService
        .getCharacter(character!)
        .subscribe({
          next: (res) => {
            this.erro = false
            if(res.count == 1){
              this.router.navigate(["resultado"], { queryParams: {char: character}})
            }else if(res.count > 1){
              this.erro = true
              this.mensagem = "Mais de um personagem encontrado, seja mais especifico"
            }
          },
          error: (err) => {
            this.erro = true
            this.mensagem = "Personagem Inválido"
          }
        });
    }
  }
}
