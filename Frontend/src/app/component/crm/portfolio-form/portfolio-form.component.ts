import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './portfolio-form.component.html',
  styleUrl: './portfolio-form.component.scss'
})
export class PortfolioFormComponent {
  saved = '';

  readonly projectForm = this.fb.group({
    projects: this.fb.array([
      this.createProject('Analytics Dashboard', 'SaaS • 2024'),
      this.createProject('Healthcare Platform', 'Enterprise • 2023')
    ])
  });

  constructor(private readonly fb: FormBuilder) {}

  get projects(): FormArray {
    return this.projectForm.get('projects') as FormArray;
  }

  createProject(title = '', meta = '') {
    return this.fb.group({
      title: [title, Validators.required],
      meta: [meta, Validators.required],
      description: ['']
    });
  }

  addProject(): void {
    this.projects.push(this.createProject());
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  submit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    this.saved = 'Portfolio projects updated!';
    setTimeout(() => (this.saved = ''), 2500);
  }
}
