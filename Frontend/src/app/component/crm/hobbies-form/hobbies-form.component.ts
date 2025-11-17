import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-hobbies-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hobbies-form.component.html',
  styleUrl: './hobbies-form.component.scss'
})
export class HobbiesFormComponent {
  saved = '';

  readonly hobbiesForm = this.fb.group({
    hobbies: this.fb.array([this.createHobby('Photography', 'Capturing minimalist architecture')])
  });

  constructor(private readonly fb: FormBuilder) {}

  get hobbies(): FormArray {
    return this.hobbiesForm.get('hobbies') as FormArray;
  }

  createHobby(title = '', detail = '') {
    return this.fb.group({
      title: [title, Validators.required],
      detail: [detail, Validators.required]
    });
  }

  addHobby(): void {
    this.hobbies.push(this.createHobby());
  }

  removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  submit(): void {
    if (this.hobbiesForm.invalid) {
      this.hobbiesForm.markAllAsTouched();
      return;
    }
    this.saved = 'Hobbies updated!';
    setTimeout(() => (this.saved = ''), 2500);
  }
}
