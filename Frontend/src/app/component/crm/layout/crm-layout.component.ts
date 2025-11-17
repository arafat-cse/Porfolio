import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CrmAuthService } from '../../../services/auth-service/crm-auth.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-crm-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './crm-layout.component.html',
  styleUrl: './crm-layout.component.scss'
})

export class CrmLayoutComponent {
  readonly navItems: NavItem[] = [
    { label: 'Overview', path: '/crm/dashboard', icon: '🏠' },
    { label: 'Hero Section', path: '/crm/dashboard/hero', icon: '⭐' },
    { label: 'About Section', path: '/crm/dashboard/about', icon: '👤' },
    { label: 'Portfolio', path: '/crm/dashboard/portfolio', icon: '💼' },
    { label: 'Hobbies', path: '/crm/dashboard/hobbies', icon: '🎨' },
    { label: 'Blog Posts', path: '/crm/dashboard/blog', icon: '📰' },
    { label: 'Testimonials', path: '/crm/dashboard/testimonials', icon: '💬' },
    { label: 'Contact', path: '/crm/dashboard/contact', icon: '✉️' },
    { label: 'Categories', path: '/crm/dashboard/categories', icon: '📂' }
  ];

  constructor(private readonly auth: CrmAuthService, private readonly router: Router) {}

  get user() {
    return this.auth.currentUser;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/crm']);
  }
}
