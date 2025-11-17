import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent {
  saved = '';

  readonly blogForm = this.fb.group({
    title: ['', Validators.required],
    category: ['Technology', Validators.required],
    excerpt: ['', Validators.required],
    content: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder) {}

  submit(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }
    this.saved = 'Blog draft saved!';
    setTimeout(() => (this.saved = ''), 2500);
  }
}
