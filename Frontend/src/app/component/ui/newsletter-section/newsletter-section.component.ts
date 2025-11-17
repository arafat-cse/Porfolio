import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsletter-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter-section.component.html',
  styleUrl: './newsletter-section.component.scss'
})
export class NewsletterSectionComponent {
  readonly title = 'Stay Updated';
  readonly description =
    'Subscribe to hear about new projects, behind-the-scenes breakdowns, and tools I am excited about.';
  readonly headline = 'Subscribe to my newsletter for the latest updates on projects, articles, and insights.';
  readonly copyright = 'Copyright 2024 Md. Arafat Hossen. All rights reserved.';
  readonly builtWith = 'Built with Angular, Tailwind CSS, and plenty of coffee.';
  readonly adminLabel = 'Admin Portal';
}
