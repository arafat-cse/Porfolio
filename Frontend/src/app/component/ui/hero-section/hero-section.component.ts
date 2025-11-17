import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../services/common-service';

interface HeroPayload {
  headline?: string;
  name?: string;
  summary?: string;
  primaryCta?: { label: string; target: string };
  secondaryCta?: { label: string; target: string };
}

interface SocialLink {
  label: string;
  icon: 'github' | 'linkedin' | 'mail';
  url: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {
  hero: HeroPayload = {
    headline: 'Hi, I\'m',
    name: 'Ashraf Ul Islam Chowdhury',
    summary: 'I write, design, and build digital experiences that make a difference.',
    primaryCta: { label: 'View Portfolio', target: '#portfolio' },
    secondaryCta: { label: 'Read Blog', target: '#blog' }
  };

  readonly socialLinks: SocialLink[] = [
    { label: 'GitHub', icon: 'github', url: 'https://github.com/arafat-js' },
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com' },
    { label: 'Email', icon: 'mail', url: 'mailto:hello@arafat.dev' }
  ];

  readonly backgroundDots = Array.from({ length: 25 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 8
  }));

  constructor(private readonly commonService: CommonService) {}

  ngOnInit(): void {
    this.loadHero();
  }

  scrollTo(target: string): void {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private loadHero(): void {
    this.commonService.get<HeroPayload>('hero', true).subscribe({
      next: (data) => {
        if (data) {
          this.hero = {
            headline: data.headline ?? this.hero.headline,
            name: data.name ?? this.hero.name,
            summary: data.summary ?? this.hero.summary,
            primaryCta: data.primaryCta ?? this.hero.primaryCta,
            secondaryCta: data.secondaryCta ?? this.hero.secondaryCta
          };
        }
      },
      error: (err) => console.error('Error fetching hero data', err)
    });
  }
}

