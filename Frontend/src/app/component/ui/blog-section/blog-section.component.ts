import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogPost, BLOG_POSTS } from '../../../shared/data/blog-posts';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-section.component.html',
  styleUrl: './blog-section.component.scss'
})
export class BlogSectionComponent {
  readonly filters = ['All', 'Technology', 'Design'];
  activeFilter = 'All';
  searchTerm = '';
  viewMode: 'grid' | 'list' = 'grid';
  displayCount = 6;
  readonly posts: BlogPost[] = BLOG_POSTS;

  constructor(private readonly router: Router) {}

  get filteredPosts(): BlogPost[] {
    return this.posts.filter((post) => {
      const matchesCategory = this.activeFilter === 'All' || post.category === this.activeFilter;
      const search = this.searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search || post.title.toLowerCase().includes(search) || post.excerpt.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }

  get visiblePosts(): BlogPost[] {
    return this.filteredPosts.slice(0, this.displayCount);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.displayCount = 6;
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  loadMore(): void {
    this.displayCount = Math.min(this.displayCount + 3, this.filteredPosts.length);
  }

  openPost(post: BlogPost): void {
    this.router.navigate(['/blog', post.id]);
  }
}
