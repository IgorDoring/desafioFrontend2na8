import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  firstForm = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email, Validators.minLength(3)]),
  });

  constructor(private router: Router){}

  onSubmit() {
    if(this.firstForm.valid){
      localStorage.setItem('email', this.firstForm.controls.email.value!)
      this.router.navigate(["search"])
    }
  }
}
