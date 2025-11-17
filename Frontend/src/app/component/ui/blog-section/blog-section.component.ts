import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogPost } from '../../../shared/data/blog-posts';
import { CommonService } from '../../../services/common-service';
import { mapApiBlogToBlogPost, unwrapOdataList } from '../../../shared/utils/blog.mapper';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-section.component.html',
  styleUrl: './blog-section.component.scss'
})
export class BlogSectionComponent implements OnInit {
  filters = ['All'];
  activeFilter = 'All';
  searchTerm = '';
  viewMode: 'grid' | 'list' = 'grid';
  displayCount = 6;
  posts: BlogPost[] = [];

  constructor(private readonly router: Router, private readonly commonService: CommonService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

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

  private loadPosts(): void {
    this.commonService
      .get<{ value?: any[] }>('Blogs?$orderby=created_at desc&$expand=category,media', true)
      .subscribe({
        next: (response) => {
          const raw = unwrapOdataList(response);
          this.posts = raw.map((entity) => mapApiBlogToBlogPost(entity));
          this.updateFilters();
        },
        error: (error) => {
          console.error('Failed to load blog posts:', error);
          this.posts = [];
          this.updateFilters();
        }
      });
  }

  private updateFilters(): void {
    const categorySet = new Set(this.posts.map((post) => post.category));
    this.filters = ['All', ...Array.from(categorySet)];
    if (!this.filters.includes(this.activeFilter)) {
      this.activeFilter = 'All';
    }
    this.displayCount = Math.min(this.displayCount, this.posts.length || 6);
  }
}
