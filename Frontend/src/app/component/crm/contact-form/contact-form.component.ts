import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  saved = '';

  readonly contactForm = this.fb.group({
    supportEmail: ['hello@portfolio.com', [Validators.required, Validators.email]],
    phone: ['+1 (555) 123-4567', Validators.required],
    location: ['Remote / Dhaka, BD', Validators.required],
    autoReply: ['Thanks for reaching out! I will respond within 24 hours.', Validators.required]
  });

  constructor(private readonly fb: FormBuilder) {}

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.saved = 'Contact preferences updated!';
    setTimeout(() => (this.saved = ''), 2500);
  }
}
