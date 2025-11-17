import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RichTextEditorComponent } from '../../../shared/ui/rich-text-editor/rich-text-editor.component';
import { BlogPost } from '../../../shared/data/blog-posts';
import { CommonService } from '../../../services/common-service';
import { mapApiBlogToBlogPost, unwrapOdataEntity, unwrapOdataList } from '../../../shared/utils/blog.mapper';

interface BlogPayload {
  title: string;
  excerpt_title: string;
  description: string;
  category_id: number | null;
  read_time: string;
  tags: string | null;
  is_active: boolean;
  is_published: boolean;
  is_featured: boolean;
  is_trending: boolean;
  likes_count: number;
  views_count: number;
  created_by?: number | null;
}

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RichTextEditorComponent],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnInit {
  saved = '';
  showForm = false;
  searchTerm = '';
  categoryFilter = 'All Categories';
  statusFilter = 'All Status';
  categories: string[] = [];
  private categoryOptions: Array<{ id: number | null; name: string }> = [];
  readonly statusOptions = ['All Status', 'Draft', 'Published'];
  readonly suggestedTags = ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js', 'Python', 'Design'];

  tags: string[] = [];
  tagInput = '';
  featuredImageName = '';
  currentUserId: number | null = null;

  posts: BlogPost[] = [];
  isLoadingPosts = false;
  isSaving = false;
  editingPost: BlogPost | null = null;
  private processingPosts = new Set<number>();

  readonly blogForm = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    excerpt: ['', Validators.required],
    content: ['', Validators.required],
    publishDate: [new Date().toISOString().substring(0, 10), Validators.required],
    readTime: ['5 min read', Validators.required],
    featured: [false],
    trending: [false]
  });

  constructor(private readonly fb: FormBuilder, private readonly commonService: CommonService) {}

  ngOnInit(): void {
    this.loadCurrentUserId();
    this.loadCategories();
    this.loadPosts();
  }

  get filteredPosts(): BlogPost[] {
    return this.posts.filter((post) => {
      const matchesSearch =
        !this.searchTerm ||
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.categoryFilter === 'All Categories' || post.category === this.categoryFilter;
      const matchesStatus =
        this.statusFilter === 'All Status' ||
        (this.statusFilter === 'Draft' && post.status === 'draft') ||
        (this.statusFilter === 'Published' && post.status === 'published');
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  addTag(tag?: string): void {
    const value = (tag ?? this.tagInput).trim();
    if (!value || this.tags.includes(value)) {
      this.tagInput = '';
      return;
    }
    this.tags.push(value);
    this.tagInput = '';
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((existing) => existing !== tag);
  }

  uploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.featuredImageName = input.files[0].name;
    }
  }

  startCreate(): void {
    this.showForm = true;
    this.editingPost = null;
    this.tags = [];
    this.featuredImageName = '';
    this.blogForm.reset({
      category: this.categories[0] ?? '',
      publishDate: new Date().toISOString().substring(0, 10),
      readTime: '5 min read',
      featured: false,
      trending: false
    });
  }

  editPost(post: BlogPost): void {
    this.showForm = true;
    this.editingPost = post;
    this.tags = [...post.tags];
    this.blogForm.patchValue({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      publishDate: post.publishDate ?? post.date,
      readTime: post.readTime,
      featured: post.featured ?? false,
      trending: post.trending ?? false
    });
  }

  closeForm(): void {
    this.showForm = false;
    this.editingPost = null;
  }

  submit(status: 'draft' | 'published'): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    const formValue = this.blogForm.value;
    const categoryId = this.getCategoryId(formValue.category ?? '');
    const payload: BlogPayload = {
      title: formValue.title ?? '',
      excerpt_title: formValue.excerpt ?? '',
      description: formValue.content ?? '',
      category_id: categoryId,
      read_time: formValue.readTime ?? '5 min read',
      tags: this.tags.length ? this.tags.join(', ') : null,
      is_active: true,
      is_published: status === 'published',
      is_featured: Boolean(formValue.featured),
      is_trending: Boolean(formValue.trending),
      likes_count: this.editingPost ? Number(this.editingPost.views) || 0 : 0,
      views_count: this.editingPost ? Number(this.editingPost.views) || 0 : 0
    };
    if (!this.editingPost && this.currentUserId !== null) {
      payload.created_by = this.currentUserId;
    }

    const request$ = this.editingPost
      ? this.commonService.put<any>(`Blogs/${this.editingPost.id}`, payload, true)
      : this.commonService.post<any>('Blogs', payload, true);

    this.isSaving = true;
    request$.subscribe({
      next: (response) => {
        const entity = unwrapOdataEntity(response) ?? {
          ...payload,
          id: this.editingPost?.id ?? Date.now()
        };
        const savedPost = mapApiBlogToBlogPost(entity);
        this.upsertPost(savedPost);
        this.saved = status === 'published' ? 'Post published!' : 'Draft saved!';
        setTimeout(() => (this.saved = ''), 2500);
        this.resetForm();
        this.showForm = false;
        this.editingPost = null;
      },
      error: (error) => {
        console.error('Failed to save blog post:', error);
      },
      complete: () => {
        this.isSaving = false;
      }
    });
  }

  togglePublish(post: BlogPost): void {
    if (!post.id) {
      return;
    }
    this.setProcessing(post.id, true);
    const payload = this.buildPayloadFromPost(post, { is_published: post.status !== 'published' });
    this.commonService.put<any>(`Blogs/${post.id}`, payload, true).subscribe({
      next: (response) => {
        const entity = unwrapOdataEntity(response) ?? { ...post, ...payload };
        const updated = mapApiBlogToBlogPost(entity);
        this.upsertPost(updated);
      },
      error: (error) => {
        console.error('Failed to update publish status:', error);
      },
      complete: () => this.setProcessing(post.id!, false)
    });
  }

  deletePost(post: BlogPost): void {
    if (!post.id) {
      return;
    }
    this.setProcessing(post.id, true);
    this.commonService.delete<void>(`Blogs/${post.id}`, null, true).subscribe({
      next: () => {
        this.posts = this.posts.filter((existing) => existing.id !== post.id);
      },
      error: (error) => {
        console.error('Failed to delete blog post:', error);
      },
      complete: () => this.setProcessing(post.id!, false)
    });
  }

  isProcessing(postId: number | undefined): boolean {
    if (!postId) {
      return false;
    }
    return this.processingPosts.has(postId);
  }

  private loadCategories(): void {
    this.commonService
      .get<{ value?: Array<{ id?: number; name: string }> }>(
        "Catagories?$filter=type eq 'BLOG' and is_active eq true&$orderby=name asc",
        true
      )
      .subscribe({
        next: (res) => {
          const list = res.value ?? [];
          if (list.length) {
            this.categoryOptions = list.map((item) => ({
              id: item.id ?? null,
              name: item.name
            }));
            this.categories = this.categoryOptions.map((option) => option.name);
          } else {
            this.setFallbackCategories();
          }
          this.blogForm.patchValue({ category: this.categories[0] ?? '' });
        },
        error: () => {
          this.setFallbackCategories();
          this.blogForm.patchValue({ category: this.categories[0] ?? '' });
        }
      });
  }

  private loadPosts(): void {
    this.isLoadingPosts = true;
    this.commonService
      .get<{ value?: any[] }>('Blogs?$orderby=created_at desc&$expand=category,media', true)
      .subscribe({
        next: (response) => {
          const list = unwrapOdataList(response);
          this.posts = list.map((entity) => mapApiBlogToBlogPost(entity));
        },
        error: (error) => {
          console.error('Failed to load blog posts:', error);
          this.posts = [];
        },
        complete: () => {
          this.isLoadingPosts = false;
        }
      });
  }

  private loadCurrentUserId(): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const rawUser = localStorage.getItem('userInfo');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed && parsed.id) {
          this.currentUserId = Number(parsed.id);
        }
      }
    } catch (error) {
      console.error('Failed to parse stored user info:', error);
    }
  }

  private getCategoryId(name: string): number | null {
    const category = this.categoryOptions.find((option) => option.name === name);
    return category?.id ?? null;
  }

  private setFallbackCategories(): void {
    this.categoryOptions = [
      { id: null, name: 'Technology' },
      { id: null, name: 'Design' },
      { id: null, name: 'Leadership' }
    ];
    this.categories = this.categoryOptions.map((option) => option.name);
  }

  private resetForm(): void {
    this.tags = [];
    this.featuredImageName = '';
    this.blogForm.reset({
      category: this.categories[0] ?? '',
      publishDate: new Date().toISOString().substring(0, 10),
      readTime: '5 min read',
      featured: false,
      trending: false
    });
  }

  private upsertPost(post: BlogPost): void {
    const exists = this.posts.some((existing) => existing.id === post.id);
    if (exists) {
      this.posts = this.posts.map((existing) => (existing.id === post.id ? post : existing));
    } else {
      this.posts = [post, ...this.posts];
    }
  }

  private buildPayloadFromPost(
    post: BlogPost,
    overrides: Partial<BlogPayload> = {}
  ): BlogPayload {
    const categoryId = post.categoryId ?? this.getCategoryId(post.category);
    return {
      title: post.title,
      excerpt_title: post.excerpt,
      description: post.content,
      category_id: categoryId,
      read_time: post.readTime,
      tags: post.tags.length ? post.tags.join(', ') : null,
      is_active: true,
      is_published: post.status === 'published',
      is_featured: Boolean(post.featured),
      is_trending: Boolean(post.trending),
      likes_count: Number(post.views) || 0,
      views_count: Number(post.views) || 0,
      created_by: null,
      ...overrides
    };
  }

  private setProcessing(postId: number, processing: boolean): void {
    if (processing) {
      this.processingPosts.add(postId);
    } else {
      this.processingPosts.delete(postId);
    }
  }
}
