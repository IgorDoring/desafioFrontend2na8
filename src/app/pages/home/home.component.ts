import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  firstForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
  });

  constructor(private router: Router){}

  onSubmit() {
    if(this.firstForm.valid){
      alert(this.firstForm.value.email)
      this.router.navigate(["search"])
    }
  }
}
