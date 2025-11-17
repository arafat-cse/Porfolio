import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: string;
}

interface QuickAction {
  label: string;
  accent?: boolean;
}

interface ActivityItem {
  title: string;
  subtitle: string;
  timeAgo: string;
}

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss'
})
export class DashboardOverviewComponent {
  readonly stats: StatCard[] = [
    { label: 'Total Posts', value: '12', subtext: '+2 this week', icon: '📘' },
    { label: 'Portfolio Items', value: '8', subtext: '+1 this month', icon: '🎒' },
    { label: 'Testimonials', value: '15', subtext: '+3 this month', icon: '💜' },
    { label: 'Contact Forms', value: '23', subtext: '+5 this week', icon: '✉️' }
  ];

  readonly actions: QuickAction[] = [
    { label: 'New Blog Post', accent: true },
    { label: 'Add Portfolio Item' },
    { label: 'Add Testimonial' },
    { label: 'Update Hero' }
  ];

  readonly activity: ActivityItem[] = [
    { title: 'Published new blog post', subtitle: 'React Performance Tips', timeAgo: '2 hours ago' },
    { title: 'Updated portfolio item', subtitle: 'E-commerce Dashboard', timeAgo: '1 day ago' },
    { title: 'Added new testimonial', subtitle: 'Sarah Johnson', timeAgo: '3 days ago' },
    { title: 'Updated about section', subtitle: 'Bio and skills', timeAgo: '1 week ago' }
  ];
}
