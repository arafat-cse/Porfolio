import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogViewComponent } from '../blog-view/blog-view.component';
import { BlogPost, BLOG_POSTS } from '../../../shared/data/blog-posts';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, BlogViewComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {
  readonly post: BlogPost | undefined;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.post = BLOG_POSTS.find((blog) => blog.id === id);
    if (!this.post) {
      this.router.navigate(['/']);
    }
  }

  handleClose(): void {
    this.router.navigate(['/']);
  }
}
