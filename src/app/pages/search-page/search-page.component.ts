import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  //todo pagina soh eh acessar ao digitar email
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });

  onSubmit(){
    alert("sasd")
  }
}
