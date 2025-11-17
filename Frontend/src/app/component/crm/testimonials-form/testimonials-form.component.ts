import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-testimonials-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testimonials-form.component.html',
  styleUrl: './testimonials-form.component.scss'
})
export class TestimonialsFormComponent {
  saved = '';

  readonly testimonialsForm = this.fb.group({
    testimonials: this.fb.array([this.createTestimonial('Sarah Johnson', 'Product Lead', 'Working with you was a joy!')])
  });

  constructor(private readonly fb: FormBuilder) {}

  get testimonials(): FormArray {
    return this.testimonialsForm.get('testimonials') as FormArray;
  }

  createTestimonial(name = '', role = '', quote = '') {
    return this.fb.group({
      name: [name, Validators.required],
      role: [role, Validators.required],
      quote: [quote, Validators.required]
    });
  }

  addTestimonial(): void {
    this.testimonials.push(this.createTestimonial());
  }

  removeTestimonial(index: number): void {
    this.testimonials.removeAt(index);
  }

  submit(): void {
    if (this.testimonialsForm.invalid) {
      this.testimonialsForm.markAllAsTouched();
      return;
    }
    this.saved = 'Testimonials updated!';
    setTimeout(() => (this.saved = ''), 2500);
  }
}
