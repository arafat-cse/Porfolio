export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  flags: string[];
  date: string;
  readTime: string;
  views: string;
  tags: string[];
  image: string;
  featured?: boolean;
  trending?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Modernizing an enterprise Angular monolith',
    excerpt:
      'Technical decisions, migration checklists, and DX wins from refactoring a legacy CRM into standalone components.',
    content:
      'Dive into the exact steps used to untangle a legacy AngularJS app, introduce standalone components, and build a release cadence teams could trust again.',
    category: 'Technology',
    flags: ['Technology', 'Trending', 'Featured'],
    date: '2024-10-18',
    readTime: '9 min read',
    views: '2.9k',
    tags: ['Angular', 'Nx', 'Clean Architecture', '+2'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    trending: true
  },
  {
    id: 2,
    title: 'Design systems that feel human',
    excerpt: 'How we bridged brand, product, and engineering to launch a multi-theme design system in eight weeks.',
    content:
      'I share the rituals, documentation, and governance model that helped five product squads contribute to the same design system without slowing velocity.',
    category: 'Design',
    flags: ['Design'],
    date: '2024-08-28',
    readTime: '12 min read',
    views: '1.8k',
    tags: ['Design Systems', 'UX', 'UI', '+2'],
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'Teaching performance budgets to product teams',
    excerpt: 'Facilitating workshops, aligning KPIs, and setting up guardrails so speed becomes a shared habit.',
    content:
      'Performance budgeting is a cultural challenge. Here is how I introduce budgets, dashboards, and ownership so every squad protects Core Web Vitals.',
    category: 'Technology',
    flags: ['Technology', 'Trending', 'Featured'],
    date: '2024-07-10',
    readTime: '11 min read',
    views: '3.2k',
    tags: ['Web Performance', 'Leadership', 'Tooling', '+2'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 4,
    title: 'Building calm interfaces for complex workflows',
    excerpt: 'How I prototype navigation, guardrails, and documentation to ship dependable UX at scale.',
    content:
      'From journey mapping to component tokens, see how I keep enterprise dashboards approachable even when the domain is overwhelming.',
    category: 'Design',
    flags: ['Design', 'Trending'],
    date: '2024-05-02',
    readTime: '10 min read',
    views: '1.4k',
    tags: ['Product Thinking', 'UX Writing'],
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=80',
    trending: true
  },
  {
    id: 5,
    title: 'Edge-ready Angular releases',
    excerpt: 'Deployment patterns, caching, and monitoring strategy for mission critical enterprise apps.',
    content:
      'Lessons learned building blue/green deployments, edge caching, and observability for healthcare and fintech Angular platforms.',
    category: 'Technology',
    flags: ['Technology'],
    date: '2024-03-22',
    readTime: '7 min read',
    views: '1.1k',
    tags: ['DevOps', 'Angular'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    title: 'Writing as a design tool',
    excerpt: 'Methods I use to align stakeholders with narrative prototypes before designing screens.',
    content:
      'Story-first prototyping helps product owners focus on outcomes. Here is the exact workshop format I run to solidify requirements.',
    category: 'Design',
    flags: ['Design'],
    date: '2024-01-05',
    readTime: '6 min read',
    views: '980',
    tags: ['Storytelling', 'Workshops'],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'
  }
];
