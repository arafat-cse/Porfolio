import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogViewComponent } from '../blog-view/blog-view.component';
import { BlogPost } from '../../../shared/data/blog-posts';
import { CommonService } from '../../../services/common-service';
import { mapApiBlogToBlogPost, unwrapOdataEntity } from '../../../shared/utils/blog.mapper';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, BlogViewComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | undefined;
  isLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly commonService: CommonService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.loadPost(id);
  }

  handleClose(): void {
    this.router.navigate(['/']);
  }

  private loadPost(id: number): void {
    this.isLoading = true;
    this.commonService
      .get<any>(`Blogs(${id})?$expand=category,media`, true)
      .subscribe({
        next: (response) => {
          const entity = unwrapOdataEntity(response);
          if (!entity) {
            this.router.navigate(['/']);
            return;
          }
          this.post = mapApiBlogToBlogPost(entity);
        },
        error: (error) => {
          console.error('Failed to load blog post:', error);
          this.router.navigate(['/']);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
