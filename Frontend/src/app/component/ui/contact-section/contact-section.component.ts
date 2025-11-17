import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface ContactMethod {
  label: string;
  value: string;
  helper: string;
  icon: 'mail' | 'phone' | 'location';
}

interface SocialLink {
  label: string;
  handle: string;
  icon: 'linkedin' | 'github' | 'dribbble';
  url: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {
  readonly intro =
    'Have a project in mind or just want to chat? I am always interested in hearing about new ideas and opportunities.';
  readonly note =
    'Whether you are a company looking to hire or an individual with an exciting project, let us build something remarkable.';

  readonly contactMethods: ContactMethod[] = [
    {
      label: 'Email',
      value: 'hello@arafat.dev',
      helper: 'Best for project briefs and collaboration notes.',
      icon: 'mail'
    },
    { label: 'Phone', value: '+880 1704-000-000', helper: 'Available 10 AM - 9 PM (GMT+6).', icon: 'phone' },
    { label: 'Location', value: 'Dhaka, Bangladesh', helper: 'Remote friendly, available for travel.', icon: 'location' }
  ];

  readonly socials: SocialLink[] = [
    {
      label: 'LinkedIn',
      handle: '@md-arafat-hossen',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/md-arafat-hossen/'
    },
    { label: 'GitHub', handle: '@arafat-js', icon: 'github', url: 'https://github.com/arafat-js' },
    { label: 'Dribbble', handle: '@arafat-designs', icon: 'dribbble', url: 'https://dribbble.com/arafat-designs' }
  ];

  readonly stayUpdated = {
    title: 'Stay Updated',
    headline: 'Subscribe for the latest articles and behind-the-scenes notes.',
    description: 'Subscribe to my newsletter for product launches, breakdowns, and tools I am excited about.',
    placeholder: 'Enter your email',
    cta: 'Subscribe'
  };
}
