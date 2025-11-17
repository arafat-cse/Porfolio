import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  type: string;
}

@Component({
  selector: 'app-crm-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  readonly types = ['HOBBIES', 'PORTFOLIO', 'SERVICES', 'BLOG'];
  readonly categories: Category[] = [];
  modalOpen = false;

  readonly categoryForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder) {}

  toggleModal(): void {
    this.modalOpen = !this.modalOpen;
    if (!this.modalOpen) {
      this.categoryForm.reset();
    }
  }

  submit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    const { name, type } = this.categoryForm.value;
    this.categories.push({
      id: this.categories.length + 1,
      name: name ?? '',
      type: type ?? ''
    });
    this.toggleModal();
  }

  remove(index: number): void {
    this.categories.splice(index, 1);
  }
}
