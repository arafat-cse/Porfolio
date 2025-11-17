import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProjectCard {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: 'All' | 'Design' | 'Development' | 'Mobile';
}

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-section.component.html',
  styleUrl: './portfolio-section.component.scss'
})
export class PortfolioSectionComponent {
  readonly filters: Array<ProjectCard['category']> = ['All', 'Design', 'Development', 'Mobile'];
  activeFilter: ProjectCard['category'] = 'All';

  readonly projects: ProjectCard[] = [
    {
      title: 'Modern Web Platform',
      subtitle: 'Realtime collaboration suite for growth teams',
      description: 'Architected a multi-tenant analytics platform with granular permissions, playbooks, and live sessions.',
      tags: ['Angular', 'NestJS', 'PostgreSQL'],
      category: 'Development'
    },
    {
      title: 'Mobile Banking App',
      subtitle: 'Wealth companion for Gen-Z founders',
      description: 'Shipped biometric auth, budgeting insights, and contextual nudges inside a modern banking app.',
      tags: ['React Native', 'UX Research', 'Fintech'],
      category: 'Mobile'
    },
    {
      title: 'E-commerce Dashboard',
      subtitle: 'Command center for omnichannel merchants',
      description: 'Data-visual rich dashboards helping merchants monitor inventory, support, and marketing funnels.',
      tags: ['Vue.js', 'D3.js', 'Analytics'],
      category: 'Development'
    },
    {
      title: 'Brand Identity System',
      subtitle: 'Design system for a climate-tech studio',
      description: 'Established a flexible identity with typography, illustrations, and component tokens.',
      tags: ['Branding', 'Design System', 'Figma'],
      category: 'Design'
    },
    {
      title: 'SaaS Landing Page',
      subtitle: 'Conversion-focused narrative website',
      description: 'Crafted story-driven copy, rich visuals, and interactive metrics to lift trial signups by 38%.',
      tags: ['UI/UX', 'Copywriting', 'Figma'],
      category: 'Design'
    },
    {
      title: 'Task Management App',
      subtitle: 'Async collaboration hub for remote studios',
      description: 'Offline-first tasking with comments, reminders, and integrations for distributed teams.',
      tags: ['Flutter', 'Firebase', 'Collaboration'],
      category: 'Mobile'
    }
  ];

  get filteredProjects(): ProjectCard[] {
    if (this.activeFilter === 'All') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.activeFilter);
  }

  setFilter(filter: ProjectCard['category']): void {
    this.activeFilter = filter;
  }
}
