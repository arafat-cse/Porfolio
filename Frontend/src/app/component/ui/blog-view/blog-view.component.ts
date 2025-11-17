import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlogPost } from '../../../shared/data/blog-posts';

@Component({
  selector: 'app-blog-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.scss'
})
export class BlogViewComponent {
  @Input() post!: BlogPost;
  @Output() closed = new EventEmitter<void>();
}
