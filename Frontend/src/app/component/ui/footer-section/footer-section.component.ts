import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FooterNavLink {
  label: string;
  target: string;
}

interface FooterSocialLink {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.scss'
})
export class FooterSectionComponent {
  readonly brand = {
    name: 'Arafat.dev',
    tagline: 'Designing and building polished product experiences.'
  };

  readonly navLinks: FooterNavLink[] = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'Blog', target: 'blog' },
    { label: 'Contact', target: 'contact' }
  ];

  readonly socials: FooterSocialLink[] = [
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/md-arafat-hossen/' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/arafat-js' },
    { label: 'Dribbble', icon: 'dribbble', url: 'https://dribbble.com/arafat-designs' }
  ];

  readonly copyright = '© 2024 Md. Arafat Hossen. All rights reserved.';
  readonly builtWith = 'Crafted with Angular and lots of curiosity.';
}
