import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {
  saved = '';

  readonly heroForm = this.fb.group({
    greeting: ['Hi, I am', Validators.required],
    name: ['Md Arafat Rahman', Validators.required],
    title: ['Full-stack engineer crafting elegant digital products.', Validators.required],
    primaryCta: ['View Portfolio', Validators.required],
    secondaryCta: ['Read Blog', Validators.required]
  });

  constructor(private readonly fb: FormBuilder) {}

  submit(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }
    this.saved = 'Hero section updated!';
    setTimeout(() => (this.saved = ''), 2500);
  }
}
