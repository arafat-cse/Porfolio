import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface NavLink {
  label: string;
  target: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0, transform: 'translateY(-30px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('400ms ease-out'))
    ]),
    trigger('scaleFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms ease-out')]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))])
    ])
  ]
})
export class NavigationComponent {
  @Input({ required: true }) navLinks: NavLink[] = [];
  @Input() activeSection = 'home';
  @Input() isDarkMode = false;
  @Output() themeToggled = new EventEmitter<void>();

  isMenuOpen = false;
  scrolled = false;

  @HostListener('window:scroll')
  handleScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  toggleTheme(): void {
    this.themeToggled.emit();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  scrollTo(target: string, event?: Event): void {
    event?.preventDefault();
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMenuOpen = false;
  }
}

