import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface HobbyCard {
  title: string;
  description: string;
  detail: string;
  image: string;
  icon: string;
}

interface HobbyStat {
  label: string;
  value: string;
}

@Component({
  selector: 'app-hobbies-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hobbies-section.component.html',
  styleUrl: './hobbies-section.component.scss'
})
export class HobbiesSectionComponent {
  readonly intro =
    'Beyond coding and design, these are the passions that keep me energized and inspired in my personal life.';

  readonly hobbies: HobbyCard[] = [
    {
      title: 'Reef Aquascape',
      description: 'Creating underwater landscapes and maintaining coral reef ecosystems at home.',
      detail: 'Coral propagation and lighting experiments.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
      icon: '🐠'
    },
    {
      title: 'Car Racing',
      description: 'The thrill of speed and precision driving on tracks with friends.',
      detail: 'Track days and sim practice weekends.',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
      icon: '🏎️'
    },
    {
      title: 'PC Gaming',
      description: 'Immersive digital worlds, strategy games, and co-op adventures.',
      detail: 'Streaming setup + custom mechanical keyboards.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
      icon: '🎮'
    },
    {
      title: 'Party',
      description: 'Celebrating life with playlists, mixing, and intentional gatherings.',
      detail: 'Curating themed playlists for friends.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      icon: '🎉'
    },
    {
      title: 'Hangout with Friends',
      description: 'Slow evenings with close friends, sharing stories and laughter.',
      detail: 'Weekly dinner club rotates hosts.',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
      icon: '🤝'
    },
    {
      title: 'Family Time',
      description: 'Cherishing family moments, cooking together, and unplugged weekends.',
      detail: 'Sunday brunch tradition lives on.',
      image: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=600&q=80',
      icon: '❤️'
    }
  ];

  readonly stats: HobbyStat[] = [
    { label: 'Track days', value: '15+' },
    { label: 'Aquarium tanks', value: '3' },
    { label: 'Hours gaming', value: '500+' },
    { label: 'Family moments', value: 'Infinite' }
  ];

  readonly quote =
    'Life is not just about work and achievements. It is about the passions that fuel creativity, the relationships that enrich our souls, and the hobbies that remind us to live fully.';
}
