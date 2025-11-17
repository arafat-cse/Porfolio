import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about-form.component.html',
  styleUrl: './about-form.component.scss'
})
export class AboutFormComponent {
  saved = '';

  readonly aboutForm = this.fb.group({
    headline: ['Crafting thoughtful digital products.', Validators.required],
    bio: [
      `I'm a multidisciplinary developer who translates complex challenges into polished digital experiences.`,
      Validators.required
    ],
    skills: ['Angular, TypeScript, Tailwind, Node.js']
  });

  constructor(private readonly fb: FormBuilder) {}

  submit(): void {
    if (this.aboutForm.invalid) {
      this.aboutForm.markAllAsTouched();
      return;
    }
    this.saved = 'About section updated!';
    setTimeout(() => (this.saved = ''), 2500);
  }
}
