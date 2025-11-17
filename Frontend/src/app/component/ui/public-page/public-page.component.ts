import { AfterViewInit, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { AboutSectionComponent } from '../about-section/about-section.component';
import { PortfolioSectionComponent } from '../portfolio-section/portfolio-section.component';
import { HobbiesSectionComponent } from '../hobbies-section/hobbies-section.component';
import { BlogSectionComponent } from '../blog-section/blog-section.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import { TestimonialsSectionComponent } from '../testimonials-section/testimonials-section.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { FooterSectionComponent } from '../footer-section/footer-section.component';

interface NavLink {
  label: string;
  target: string;
  icon: string;
}

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    AboutSectionComponent,
    PortfolioSectionComponent,
    HobbiesSectionComponent,
    BlogSectionComponent,
    ContactSectionComponent,
    TestimonialsSectionComponent,
    NavigationComponent,
    FooterSectionComponent
  ],
  templateUrl: './public-page.component.html',
  styleUrl: './public-page.component.scss',
  host: {
    class: 'portfolio-page',
    '[class.dark-mode]': 'isDarkMode'
  }
})
export class PublicPageComponent implements AfterViewInit {
  isDarkMode = true;
  activeSection = 'home';
  private readonly scrollOffset = 140;

  readonly navLinks: NavLink[] = [
    { label: 'Home', target: 'home', icon: 'home' },
    { label: 'About', target: 'about', icon: 'user' },
    { label: 'Portfolio', target: 'portfolio', icon: 'briefcase' },
    { label: 'Hobbies', target: 'hobbies', icon: 'spark' },
    { label: 'Blog', target: 'blog', icon: 'article' },
    { label: 'Contact', target: 'contact', icon: 'mail' }
  ];

  // readonly subtitle = 'Dhaka-based full-stack engineer partnering with startups to launch refined, resilient products.';
  // readonly lastUpdated = 'Updated | November 2024';

  ngAfterViewInit(): void {
    setTimeout(() => this.detectSection(), 200);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.detectSection();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  scrollTo(target: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = target;
    }
  }

  private detectSection(): void {
    let current = this.navLinks[0].target;
    for (const link of this.navLinks) {
      const el = document.getElementById(link.target);
      if (!el) {
        continue;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top - this.scrollOffset <= 0) {
        current = link.target;
      }
    }
    this.activeSection = current;
  }
}
