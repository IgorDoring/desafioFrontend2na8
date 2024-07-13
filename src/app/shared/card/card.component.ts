import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  // genericForm = new FormGroup({
  //   textInput: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
  // });

  // constructor(private router: Router){}

  // onSubmit() {
  //   if(this.genericForm.valid){
  //     alert(this.genericForm.value.textInput)
  //     this.router.navigate(["search"])
  //   }
  // }
}
