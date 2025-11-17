import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss'
})
export class TestimonialsSectionComponent {
  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Working with this developer was an absolute pleasure. The attention to detail and technical expertise exceeded our expectations.',
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      rating: 5
    },
    {
      quote:
        'The quality of work and communication throughout the project was outstanding. They understood our vision and brought it to life.',
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      rating: 5
    },
    {
      quote:
        'Not only did they deliver exceptional technical work, but they also provided valuable insights that improved our product strategy.',
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'Creative Solutions',
      rating: 5
    }
  ];

  readonly partners = ['TechStart', 'InnovateLab', 'Creative Solutions', 'Digital Agency', 'StartupCo'];
}
