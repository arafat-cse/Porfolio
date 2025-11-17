import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrmAuthService } from '../../../services/auth-service/crm-auth.service';

@Component({
  selector: 'app-crm-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crm-login.component.html',
  styleUrl: './crm-login.component.scss'
})
export class CrmLoginComponent {
  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  error = '';
  loading = false;

  constructor(private readonly fb: FormBuilder, private readonly auth: CrmAuthService, private readonly router: Router) {}

  submit(): void {
    if (this.loginForm.invalid || this.loading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loading = true;
    this.error = '';

    setTimeout(() => {
      const success = this.auth.login(email ?? '', password ?? '');
      this.loading = false;

      if (!success) {
        this.error = 'Invalid credentials. Use the seeded CRM accounts.';
        return;
      }

      this.router.navigate(['/crm/dashboard']);
    }, 400);
  }
}
